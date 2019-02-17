const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
const { Layer } = require("../db/models");
const {
  drawImageLayer,
  drawTextLayer,
  drawRectangularLayer
} = require("ssig-renderer");
const { createCanvas, registerFont, loadImage } = require("canvas");

const LAYER_TYPE_RENDERER = {
  text: drawTextLayer,
  rectangular: drawRectangularLayer,
  image: drawImageLayer
};

async function loadLayerFont(layer) {
  const { fontFile = "" } = layer.typeData;

  const fileNameSegments = fontFile.split("/");
  const fileName = fileNameSegments[fileNameSegments.length - 1];
  const fontPath = path.resolve(__dirname, "../fonts", fileName);

  if (fs.existsSync(fontPath)) {
    return fontPath;
  }

  const res = await fetch(fontFile);

  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(fontPath, { autoClose: true });

    res.body.pipe(fileStream);
    res.body.on("error", err => {
      reject(err);
    });
    fileStream.on("finish", function() {
      resolve(fontPath);
    });
  });
}

async function versionCanvasRenderer(version, variables = {}) {
  const layers = await version.getLayers({ order: [["z", "ASC"]] });
  const { width, height, backgroundColor } = version;
  const base = createCanvas(width, height);
  const ctx = base.getContext("2d");

  const canvasLayers = await Promise.all(
    layers.map(async l => {
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
        case "text": {
          const { typeData } = layer;
          const fontPath = await loadLayerFont(layer);
          const { fontFamily, fontVariant } = typeData;
          const fullFontFamily = [fontFamily, fontVariant].join("--");

          registerFont(fontPath, { family: fullFontFamily });
          Object.assign(layer.typeData, { fontFamily: fullFontFamily });

          return renderer(canvas, layer);
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
