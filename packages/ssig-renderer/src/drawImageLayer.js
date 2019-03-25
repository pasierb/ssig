import { setupCanvas, setShadow, roundedCornersPath } from "./helpers";
import { cover, contain } from "intrinsic-scale";

function getImageRect(
  image,
  { size, width = image.width, height = image.height }
) {
  switch (size) {
    case "cover": {
      return cover(width, height, image.width, image.height);
    }
    case "contain": {
      return contain(width, height, image.width, image.height);
    }
    default: {
      return { x: 0, y: 0, width: image.width, height: image.height };
    }
  }
}

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {object} layer
 * @param {Promise<HTMLImageElement>} getImage
 */
export default function drawImageLayer(canvas, layer, getImage) {
  const { x, y, typeData } = layer;
  const {
    imageUri,
    imageData,
    repeat,
    shadow,
    borderRadius = 0,
    opacity = 100
  } = typeData;

  return getImage(imageData || imageUri).then(image => {
    image.name = layer.name;
    const width = typeData.width || image.width;
    const height = typeData.height || image.height;

    const rect = getImageRect(image, typeData);

    setupCanvas(canvas, ctx => {
      ctx.globalAlpha = Number(opacity) / 100;

      if (repeat && repeat !== "no-repeat") {
        const pattern = ctx.createPattern(image, repeat);

        ctx.fillStyle = pattern;
        ctx.fillRect(x, y, canvas.width, canvas.height);
      } else {
        roundedCornersPath(ctx, x, y, width, height, borderRadius);

        if (shadow) {
          setShadow(ctx, layer.typeData);
          ctx.fill();
        }

        ctx.clip();
        ctx.drawImage(image, x + rect.x, y + rect.y, rect.width, rect.height);
      }
    });

    return canvas;
  });
}
