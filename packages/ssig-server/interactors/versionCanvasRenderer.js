const { Layer } = require("../db/models");
const {
  drawImageLayer,
  drawTextLayer,
  drawRectangularLayer
} = require("ssig-renderer");
const { createCanvas, loadImage } = require("canvas");

const LAYER_TYPE_RENDERER = {
  text: drawTextLayer,
  rectangular: drawRectangularLayer,
  image: drawImageLayer
};

async function versionCanvasRenderer(version, variables = {}) {
  const layers = await version.getLayers({ order: [["z", "ASC"]] });
  const { width, height, backgroundColor } = version;
  const base = createCanvas(width, height);
  const ctx = base.getContext("2d");

  const canvasLayers = await Promise.all(
    layers.map(l => {
      const layer = l.dataValues;
      const canvas = createCanvas(width, height);
      const renderer = LAYER_TYPE_RENDERER[layer.type];

      if (!renderer) {
        // LOG ME!
        throw new Error("Unknown layer type");
      }

      Object.assign(layer.typeData, variables[layer.code] || {});

      switch (layer.type) {
        case "image": {
          return renderer(canvas, layer, loadImage);
        }
        default: {
          return renderer(canvas, layer);
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
