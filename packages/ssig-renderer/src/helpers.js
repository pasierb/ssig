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
export function setupCanvas(canvas, callback) {
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
export function setShadow(ctx, attrs) {
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
export function roundedCornersPath(ctx, x, y, width, height, r) {
  const radius = Number(r);

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
