import { h, Component } from "preact";
import { layerProvider } from "./LayerBase";
import { drawImageLayer } from "ssig-renderer";

function getImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.src = src;
    image.onload = () => resolve(image);
    image.onerror = reject;
  });
}

export default layerProvider((canvas, layer) => {
  return drawImageLayer(canvas, layer, getImage);
});
