const { Project } = require("../../../../db/models");
const { versionCanvasRenderer } = require("../../../../interactors");

async function getProject(req, res) {
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

  const project = await Project.findByPk(projectId, {
    include: [{ association: "publishedVersion" }]
  });

  if (!project || !project.publishedVersion) {
    return res
      .status(404)
      .send("Project does not exist or has no published version");
  }

  project.publishedVersion.increment("invocationsCount");

  const canvas = await versionCanvasRenderer(
    project.publishedVersion,
    variables
  );

  res.set("Cache-Control", "public, max-age=60, s-maxage=31536000");
  res.writeHead(200, { "Content-Type": "image/jpeg" });
  return canvas.createJPEGStream().pipe(res);
}

async function createProject(req, res) {
  if (!req.user) {
    throw new Error();
  }

  try {
    const project = await Project.create({
      name: "New project",
      userId: req.user.id
    });
    const version = await project.createVersion();

    res.json({ project, version });
  } catch (e) {
    res.status(400).send(e);
  }
}

module.exports = {
  getProject,
  createProject
};
