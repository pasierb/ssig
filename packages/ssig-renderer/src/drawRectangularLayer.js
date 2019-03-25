import { setupCanvas, setShadow, roundedCornersPath } from "./helpers";

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {object} layer
 */
export default function drawRectangularLayer(canvas, layer) {
  const { x, y, typeData } = layer;
  const {
    width,
    height,
    color,
    shadow,
    borderRadius,
    opacity = 100
  } = typeData;

  setupCanvas(canvas, ctx => {
    ctx.globalAlpha = Number(opacity) / 100;

    if (shadow) {
      setShadow(ctx, layer.typeData);
    }

    roundedCornersPath(ctx, x, y, width, height, borderRadius || 0);

    ctx.fillStyle = color;
    ctx.fill();
    ctx.clip();
  });

  return Promise.resolve(canvas);
}
