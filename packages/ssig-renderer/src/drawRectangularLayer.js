import {
  setupCanvas,
  setShadow,
  roundedCornersPath,
  getAbsolutePosition,
  getAbsoluteSize
} from "./helpers";

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {object} layer
 */
export default function drawRectangularLayer(canvas, layer) {
  const { x, xUnit, y, yUnit, typeData } = layer;
  const {
    width,
    widthUnit,
    height,
    heightUnit,
    color,
    shadow,
    borderRadius = 0,
    opacity = 100
  } = typeData;

  setupCanvas(canvas, ctx => {
    ctx.globalAlpha = Number(opacity) / 100;

    if (shadow) {
      setShadow(ctx, layer.typeData);
    }

    const absWidth = getAbsoluteSize({
      value: width,
      scale: ctx.canvas.width,
      unit: widthUnit
    });
    const absHeight = getAbsoluteSize({
      value: height,
      scale: ctx.canvas.height,
      unit: heightUnit
    });
    const absX = getAbsolutePosition({
      value: x,
      size: absWidth,
      scale: ctx.canvas.width,
      unit: xUnit
    });
    const absY = getAbsolutePosition({
      value: y,
      size: absHeight,
      scale: ctx.canvas.height,
      unit: yUnit
    });

    roundedCornersPath(ctx, absX, absY, absWidth, absHeight, borderRadius);

    ctx.fillStyle = color;
    ctx.fill();
    ctx.clip();
  });

  return Promise.resolve(canvas);
}
