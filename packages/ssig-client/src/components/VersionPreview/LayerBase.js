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

  drawLayer = () => {
    const { renderer, layer } = this.props;

    try {
      renderer(this.canvasEl, layer);
    } catch (e) {
      console.log(e);
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
