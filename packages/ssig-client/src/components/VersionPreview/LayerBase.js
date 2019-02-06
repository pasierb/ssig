import { h, Component } from "preact";

export const layerProvider = renderer => props => (
  <LayerBase renderer={renderer} {...props} />
);

export default class LayerBase extends Component {
  componentWillReceiveProps(props) {
    this.drawLayer();
  }

  componentDidMount() {
    this.drawLayer();
  }

  drawLayer = () => {
    try {
      this.props.renderer(this.canvasEl, this.props.layer);
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
