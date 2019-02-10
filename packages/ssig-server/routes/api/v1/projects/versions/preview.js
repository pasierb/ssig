const models = require("../../../../../db/models");
const { versionCanvasRenderer } = require("../../../../../interactors");

/**
 * /api/v1/projects/:projectId/version/:versionId/preview
 *
 * @param {*} req
 * @param {*} res
 */
async function preview(req, res) {
  const { projectId, versionId } = req.params;

  const variables = Object.keys(req.query).reduce((acc, key) => {
    const [code, attr] = key.split(".");

    if (code && attr) {

      acc[code] = Object.assign({}, acc[code] || {}, {
        [attr]: req.query[key]
      });

      if (attr === 'imageUri') {
        acc[code].imageData = undefined;
      }
    }

    return acc;
  }, {});

  const version = await models.Version.findOne({
    where: { projectId, id: versionId }
  });
  const canvas = await versionCanvasRenderer(version, variables);

  res.set("Cache-Control", "public, max-age=60, s-maxage=31536000");
  res.writeHead(200, { "Content-Type": "image/jpeg" });
  return canvas.createJPEGStream().pipe(res);
}

module.exports = preview;
