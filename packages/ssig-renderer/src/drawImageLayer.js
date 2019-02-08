import { setupCanvas, setShadow, roundedCornersPath } from "./helpers";

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {object} layer
 * @param {Promise<HTMLImageElement>} getImage
 */
export default function drawImageLayer(canvas, layer, getImage) {
  const { x, y, typeData } = layer;
  const { imageUri, imageData, repeat, shadow, borderRadius } = typeData;

  return getImage(imageData || imageUri).then(image => {
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

    return canvas
  })
}
