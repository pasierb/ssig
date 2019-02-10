import { h, Component } from "preact";
import LayerPanel from "./LayerPanel";
import styles from "./LayerList.scss";

export default class LayerList extends Component {
  state = {
    activeLayerId: null
  };

  layerToggleHandler = layer => {
    this.setState(state => ({
      activeLayerId: layer.id === state.activeLayerId ? null : layer.id
    }));
  };

  render(props, state) {
    const { layers, renderItem } = props;
    const { activeLayerId } = state;

    return (
      <div className={styles.LayerList}>
        {layers.map((layer, i) => (
          <LayerPanel
            layer={layer}
            isActive={activeLayerId === layer.id}
            onClick={this.layerToggleHandler}
          >
            {renderItem(layer, i)}
          </LayerPanel>
        ))}
      </div>
    );
  }
}
