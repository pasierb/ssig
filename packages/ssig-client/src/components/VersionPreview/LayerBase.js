import { h, Component } from "preact";

export const layerProvider = renderer => props => (
  <LayerBase renderer={renderer} {...props} />
);

export default class LayerBase extends Component {
  componentDidUpdate() {
    this.drawLayer();
  }

  componentDidMount() {
    this.drawLayer();
  }

  clear = () => {
    const ctx = this.canvasEl.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  drawLayer = () => {
    const { renderer, layer } = this.props;

    try {
      renderer(this.canvasEl, layer).catch(this.clear);
    } catch (e) {
      this.clear();
    }
  };

  render({ version }) {
    return (
      <canvas
        width={version.width}
        height={version.height}
        ref={canvas => (this.canvasEl = canvas)}
      />
    );
  }
}
