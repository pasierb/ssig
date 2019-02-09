import { h, Component } from "preact";
import client from "../graph";
import Editor from "../components/Editor/Editor";

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
          code
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

const CREATE_LAYER_MUTATION = `
  mutation createNewLayer($layerInput: LayerInput!, $versionId: String!) {
    createLayer(versionId: $versionId, layerInput: $layerInput) {
      id
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

const PROMOTE_LAYER_MUTATION = `
  mutation promoteLayer($id: String!) {
    promoteLayer(id: $id) {
      id
    }
  }
`;

const DEMOTE_LAYER_MUTATION = `
  mutation demoteLayer($id: String!) {
    demoteLayer(id: $id) {
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

    client
      .request(VERSION_QUERY, { projectId, versionId })
      .then(({ project }) => {
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
    const { id, x, y, name, typeData, code } = layer;

    // TODO: make an optimistic UI update first, then persist
    client
      .request(UPDATE_LAYER_MUTATION, {
        id,
        layerInput: { x, y, name, typeData, code }
      })
      .then(this.fetchData);
  };

  handleLayerCreate = layer => {
    const { versionId } = this.props;
    const { type, name } = layer;

    client
      .request(CREATE_LAYER_MUTATION, { versionId, layerInput: { type, name } })
      .then(this.fetchData);
  };

  handleLayerPromote = layer => {
    client
      .request(PROMOTE_LAYER_MUTATION, { id: layer.id })
      .then(this.fetchData);
  };

  handleLayerDemote = layer => {
    client
      .request(DEMOTE_LAYER_MUTATION, { id: layer.id })
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
        onLayerCreate={this.handleLayerCreate}
        onLayerPromote={this.handleLayerPromote}
        onLayerDemote={this.handleLayerDemote}
      />
    );
  }
}
