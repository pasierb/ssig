const models = require("../../../../../db/models");
const { drawImageLayer, drawTextLayer } = require("ssig-renderer");
const { createCanvas, loadImage } = require("canvas");

/**
 * /api/v1/projects/:projectId/version/:versionId/preview
 *
 * @param {*} req
 * @param {*} res
 */
async function preview(req, res) {
  const { projectId, versionId } = req.params;

  // TODO: can be done in one query, check how to do it in sequelize
  const project = await models.Project.findByPk(projectId);
  const version = await project.getVersions({
    where: { id: versionId },
    limit: 1
  });
  const layers = await version[0].getLayers();
  const width = 500;
  const height = 500;
  const base = createCanvas(width, height);
  const ctx = base.getContext("2d");

  const canvasLayers = await Promise.all(
    layers.map(async layer => {
      const canvas = createCanvas(width, width);

      switch (layer.type) {
        case "text": {
          return drawTextLayer(canvas, layer);
        }
        case "image": {
          return await drawImageLayer(canvas, layer, loadImage);
        }
      }
    })
  );

  canvasLayers.forEach(canvas => {
    ctx.drawImage(canvas, 0, 0, width, height);
  });

  res.set("Cache-Control", "public, max-age=60, s-maxage=31536000");
  res.writeHead(200, { "Content-Type": "image/jpeg" });
  return base.createJPEGStream().pipe(res);
}

module.exports = preview;
