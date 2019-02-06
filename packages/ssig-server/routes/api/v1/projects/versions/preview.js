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

  const version = await models.Version.findOne({
    where: { projectId, id: versionId }
  });
  const canvas = await versionCanvasRenderer(version);

  res.set("Cache-Control", "public, max-age=60, s-maxage=31536000");
  res.writeHead(200, { "Content-Type": "image/jpeg" });
  return canvas.createJPEGStream().pipe(res);
}

module.exports = preview;
