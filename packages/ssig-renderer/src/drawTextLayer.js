import { setupCanvas, setShadow } from "./helpers";

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {object} layer
 */
export default function drawTextLayer(canvas, layer) {
  const { x, y, typeData } = layer;
  let { lineHeight } = typeData;
  const {
    fontSize = "14",
    fontFamily,
    color = "#000",
    shadow,
    text = "",
    maxLineLength = Infinity,
    textAlign = "left"
  } = typeData;

  if (!lineHeight) {
    lineHeight = fontSize;
  }

  const rows = text
    .split(/\n/)
    .map(row => {
      return row.split(/\s/).reduce((acc, word) => {
        const row = acc.pop() || "";

        if (!row) {
          acc.push(word);
          return acc;
        }

        if (row.length + word.length > maxLineLength) {
          acc.push(row, word);
        } else {
          acc.push([row, word].join(" "));
        }

        return acc;
      }, []);
    })
    .reduce((acc, row) => acc.concat(row), []);

  setupCanvas(canvas, ctx => {
    if (shadow) {
      setShadow(ctx, typeData);
    }

    ctx.textAlign = textAlign;
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px ${fontFamily}`;
    rows.forEach((row, index) => {
      ctx.fillText(row, x, y + (index + 1) * lineHeight);
    });
  });

  return Promise.resolve(canvas);
}
