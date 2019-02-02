import { h, Component } from "preact";
import client from "../graph";
import Editor from "../components/Editor";

const VERSION_QUERY = `
  query getVersion($versionId: String!) {
    version(id: $versionId) {
      id
      width
      height
      backgroundColor
      status
      layers {
        id
        name
        type
        typeData
        x
        y
        z
      }
    }
  }
`;

const UPDATE_LAYER_MUTATION = `
  mutation updateLayer($id: String!, $layerInput: LayerInput!) {
    updateLayer(id: $id, layerInput: $layerInput) {
      id
    }
  }
`;

export default class EditorContainer extends Component {
  data = {
    version: undefined,
    layers: []
  };

  fetchData = () => {
    const { versionId } = this.props;

    client.request(VERSION_QUERY, { versionId }).then(({ version }) => {
      const { layers, ...rest } = version;

      this.setState({
        layers,
        version: rest
      });
    });
  };

  handleLayerChange = layer => {
    const { id, x, y, name, typeData } = layer;

    // TODO: make an optimistic UI update first, then persist
    client
      .request(UPDATE_LAYER_MUTATION, {
        id,
        layerInput: { x, y, name, typeData }
      })
      .then(this.fetchData);
  };

  componentWillMount() {
    this.fetchData();
  }

  render(props, { layers, version }) {
    if (!version) {
      return <p>Loading</p>;
    }

    return (
      <Editor
        version={version}
        layers={layers}
        onLayerChange={this.handleLayerChange}
      />
    );
  }
}
