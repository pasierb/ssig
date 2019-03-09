import { h, Component } from "preact";
import Layer from "./Layer";
import VersionBackdrop from "./VersionBackdrop";
import styles from "./VersionPreview.scss";

function getLayersAtCoordinates({ x, y }, layers) {
  return layers.filter(l => {
    switch (l.type) {
      case "rectangular": {
        const { width, height } = l.typeData;

        if (x >= l.x && x <= l.x + width && y >= l.y && y <= l.y + height) {
          return true;
        }
      }
      case "image": {
        const { width, height } = l.typeData;

        if (x >= l.x && x <= l.x + width && y >= l.y && y <= l.y + height) {
          return true;
        }
      }
      case "text": {
      }
    }

    return false;
  });
}

export default class VersionPreview extends Component {
  rootEl = undefined;
  state = {
    selectedLayer: null,
    startX: null,
    startY: null
  };

  handleMouseDown = event => {
    const { layers } = this.props;
    const { x, y } = event;
    const selectedLayers = getLayersAtCoordinates(event, layers);

    this.setState({
      selectedLayer: selectedLayers[selectedLayers.length - 1],
      startX: x,
      startY: y
    });
  };

  updateLayerPosition = ({ x, y }) => {
    const { onLayerChange } = this.props;
    const { selectedLayer, startX, startY } = this.state;

    if (onLayerChange && selectedLayer) {
      onLayerChange({
        ...selectedLayer,
        x: selectedLayer.x + (x - startX),
        y: selectedLayer.y + (y - startY)
      });
    }
  };

  handleMouseUp = event => {
    this.updateLayerPosition(event);
    this.setState({ selectedLayer: null });
  };

  handleMouseMove = event => {
    if (!this.state.selectedLayer) return;

    this.updateLayerPosition(event);
  };

  render(props) {
    const { version, layers } = props;

    return (
      <div
        className={styles.VersionPreview}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
            style={{
              width: version.width,
              height: version.height
            }}
      >
        <VersionBackdrop
          version={version}
          className={styles.VersionPreview__layerContainer}
        />

        {layers.map(layer => (
          <div
            className={styles.VersionPreview__layerContainer}
          >
            <Layer layer={layer} version={version} />
          </div>
        ))}
      </div>
    );
  }
}
