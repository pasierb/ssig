import { h, Component } from "preact";
import client from "../graph";
import Editor from "../components/Editor";

const VERSION_QUERY = `
  query getProjectVersion($projectId: String!, $versionId: String!) {
    project(id: $projectId) {
      version(id: $versionId) {
        id
        width
        height
        backgroundColor
        status
        projectId
        publishedAt
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
  }
`;

const UPDATE_LAYER_MUTATION = `
  mutation updateLayer($id: String!, $layerInput: LayerInput!) {
    updateLayer(id: $id, layerInput: $layerInput) {
      id
    }
  }
`;

const PUBLISH_VERSION_MUTATION = `
  mutation publishVersion($projectId: String!, $versionId: String!) {
    publishProjectVersion(projectId: $projectId, versionId: $versionId) {
      id
      publishedVersionId
    }
  }
`;

export default class EditorContainer extends Component {
  data = {
    version: undefined,
    layers: []
  };

  fetchData = () => {
    const { versionId, projectId } = this.props;

    client.request(VERSION_QUERY, { projectId, versionId }).then(({ project }) => {
      const { version } = project;
      const { layers, ...rest } = version;

      this.setState({
        project,
        layers,
        version: rest
      });
    });
  };

  handleVersionPublish = () => {
    const { version } = this.state;

    client
      .request(PUBLISH_VERSION_MUTATION, {
        projectId: version.projectId,
        versionId: version.id
      })
      .then(this.fetchData);
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
        onVersionPublish={this.handleVersionPublish}
        onLayerChange={this.handleLayerChange}
      />
    );
  }
}
