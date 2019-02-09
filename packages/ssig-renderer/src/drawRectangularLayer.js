import { setupCanvas, setShadow } from "./helpers";

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @param {object} layer 
 */
export default function drawRectangularLayer(canvas, layer) {
  const { x, y, typeData } = layer;
  const { width, height, color, shadow } = typeData;

  setupCanvas(canvas, ctx => {
    if (shadow) {
      setShadow(ctx, layer.typeData);
    }

    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  });

  return Promise.resolve(canvas);
}
