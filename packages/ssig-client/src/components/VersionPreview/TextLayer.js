import { h, Component } from "preact";
import LayerBase, { layerProvider } from "./LayerBase";
import { drawTextLayer } from "ssig-renderer";

// export default layerProvider(drawTextLayer);

export default class TextLayer extends LayerBase {
  componentWillMount() {
    this.loadFont();
  }

  componentDidUpdate() {
    this.loadFont();
  }

  loadFont = () => {
    const { fontFile, fontFamily } = this.props.layer.typeData;

    if (fontFile && fontFamily) {
      const fontFace = new FontFace(fontFamily, `url(${fontFile})`);

      fontFace.load().then(font => {
        document.fonts.add(font)
        this.drawLayer();
      });
    }

  }

  drawLayer = () => {
    try {
      drawTextLayer(this.canvasEl, this.props.layer);
    } catch (e) {
      console.log(e);
    }
  };
}
