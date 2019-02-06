const { drawImageLayer, drawTextLayer } = require("ssig-renderer");
const { createCanvas, loadImage } = require("canvas");

async function versionCanvasRenderer(version) {
  const layers = await version.getLayers();
  const { width, height, backgroundColor } = version;
  const base = createCanvas(width, height);
  const ctx = base.getContext("2d");

  const canvasLayers = await Promise.all(
    layers.map(async layer => {
      const canvas = createCanvas(width, height);

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

  return base;
}

module.exports = versionCanvasRenderer;
