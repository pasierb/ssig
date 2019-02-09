import { h, Component } from "preact";

export default class LayerList extends Component {
  state = {
    activeLayerId: null
  };

  layerToggleHandler = layer => e => {
    e.preventDefault();

    this.setState(state => ({
      activeLayerId: layer.id === state.activeLayerId ? null : layer.id
    }));
  };

  render(props, state) {
    const { layers, renderItem } = props;
    const { activeLayerId } = state;

    return (
      <div>
        {layers.map((layer, i) => (
          <nav className="panel">
            <a className="panel-block" onClick={this.layerToggleHandler(layer)}>
              {layer.name}
            </a>
            {activeLayerId === layer.id && (
              <div className="panel-block">{renderItem(layer, i)}</div>
            )}
          </nav>
        ))}
      </div>
    );
  }
}
