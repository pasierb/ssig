const models = require("../../../../db/models");
const { versionCanvasRenderer } = require("../../../../interactors");

async function project(req, res) {
  const { projectId } = req.params;

  const variables = Object.keys(req.query).reduce((acc, key) => {
    const [code, attr] = key.split(".");

    if (code && attr) {
      acc[code] = Object.assign({}, acc[code] || {}, {
        [attr]: req.query[key]
      });

      if (attr === "imageUri") {
        acc[code].imageData = undefined;
      }
    }

    return acc;
  }, {});

  const project = await models.Project.findByPk(projectId, {
    include: [{ association: "publishedVersion" }]
  });

  const canvas = await versionCanvasRenderer(
    project.publishedVersion,
    variables
  );

  res.set("Cache-Control", "public, max-age=60, s-maxage=31536000");
  res.writeHead(200, { "Content-Type": "image/jpeg" });
  return canvas.createJPEGStream().pipe(res);
}

module.exports = project;
