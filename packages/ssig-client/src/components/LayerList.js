import { h, Component } from "preact";

export default class LayerList extends Component {
  state = {
    activeLayerId: null
  };

  layerToggleHandler = layer => e => {
    e.preventDefault();

    this.setState({
      activeLayerId: layer.id
    });
  };

  render(props, state) {
    const { layers, renderItem } = props;
    const { activeLayerId } = state;

    return (
      <div>
        {layers.map(layer => {
          return (
            <nav className="panel">
              <a
                className="panel-block"
                onClick={this.layerToggleHandler(layer)}
              >
                {layer.name}
              </a>
              <div
                className="panel-block"
                style={{
                  display: activeLayerId === layer.id ? "block" : "none"
                }}
              >
                {renderItem(layer)}
              </div>
            </nav>
          );
        })}
      </div>
    );
  }
}
