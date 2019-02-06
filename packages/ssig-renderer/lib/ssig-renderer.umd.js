(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['ssig-renderer'] = {}));
}(this, function (exports) { 'use strict';

  /**
   *
   * @callback setupCanvasCallback
   * @param {CanvasRenderingContext2D} ctx
   */

  /**
   * Sets up canvas and restores it's state afterwards
   *
   * @param {HTMLCanvasElement} canvas HTMLCanvasElement
   * @param {setupCanvasCallback} callback callback function
   */
  function setupCanvas(canvas, callback) {
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("2D Context not available");

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    callback(ctx);
    ctx.restore();
  }

  /**
   * Sets context shadow
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {object} attrs
   * @param {number} attrs.shadowBlur
   * @param {string} attrs.shadowColor
   * @param {number} attrs.shadowOffsetX
   * @param {number} attrs.shadowOffsetY
   */
  function setShadow(ctx, attrs) {
    const {
      shadowBlur = 0,
      shadowColor = "#000",
      shadowOffsetX = 0,
      shadowOffsetY = 0
    } = attrs;

    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} radius
   */
  function roundedCornersPath(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   * @param {object} layer 
   */
  function drawTextLayer(canvas, layer) {
    const breakCharCount = 20;
    const { x, y, typeData } = layer;
    let { lineHeight } = typeData;
    const { fontSize = "14", fontFamily, color = "#000", shadow, text = "" } = typeData;

    if (!lineHeight) {
      lineHeight = fontSize;
    }

    const rows = text.split(/\s/).reduce(
      (acc, word) => {
        const row = acc.pop() || "";

        if (!row) {
          acc.push(word);
          return acc;
        }

        if (row.length + word.length > breakCharCount) {
          acc.push(row, word);
        } else {
          acc.push([row, word].join(" "));
        }

        return acc;
      },
      []
    );

    setupCanvas(canvas, ctx => {
      if (shadow) {
        setShadow(ctx, typeData);
      }

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px ${fontFamily}`;
      rows.forEach((row, index) => {
        ctx.fillText(row, x, y + (index + 1) * lineHeight);
      });
    });

    return canvas
  }

  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {object} layer
   * @param {Promise<HTMLImageElement>} getImage
   */
  async function drawImageLayer(canvas, layer, getImage) {
    const { x, y, typeData } = layer;
    const { imageUri, imageData, repeat, shadow, borderRadius } = typeData;
    const image = await getImage(imageData || imageUri); // TODO
    image.name = layer.name;
    const width = typeData.width || image.width;
    const height = typeData.height || image.height;

    setupCanvas(canvas, ctx => {
      if (repeat && repeat !== "no-repeat") {
        const pattern = ctx.createPattern(image, repeat);

        ctx.fillStyle = pattern;
        ctx.fillRect(x, y, canvas.width, canvas.height);
      } else {
        if (borderRadius) {
          roundedCornersPath(ctx, x, y, width, height, borderRadius);
        }

        if (shadow) {
          setShadow(ctx, layer);
          ctx.fill();
        }

        if (borderRadius) {
          ctx.clip();
        }

        ctx.drawImage(image, x, y, width, height);
      }
    });

    return canvas;
  }

  exports.drawTextLayer = drawTextLayer;
  exports.drawImageLayer = drawImageLayer;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
