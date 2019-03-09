import graph from "../graph";
import { debounce } from "lodash";

export default function activeVersionActions(store) {
  async function fetchVersion(state, { projectId, versionId }) {
    const { project } = await graph.request(
      `
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
      `,
      { projectId, versionId }
    );

    return {
      activeVersion: project.version
    };
  }

  async function createLayer(state, { type, name }) {
    const { createLayer } = await graph.request(
      `
          mutation createNewLayer($layerInput: LayerInput!, $versionId: String!) {
            createLayer(versionId: $versionId, layerInput: $layerInput) {
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
        `,
      {
        layerInput: { type, name },
        versionId: state.activeVersion.id
      }
    );

    return {
      activeVersion: {
        ...state.activeVersion,
        layers: [...state.activeVersion.layers, createLayer]
      }
    };
  }

  function deleteLayer(state, { id }) {
    const layers = [...state.activeVersion.layers];
    const index = layers.findIndex(l => l.id === id);
    layers.splice(index, 1);

    // TODO: handle errors on optimistic update
    graph.request(
      `
        mutation deleteLayer($id: String!) {
          deleteLayer(id: $id)
        }
      `,
      { id }
    );

    return {
      activeVersion: {
        ...state.activeVersion,
        layers
      }
    };
  }

  function updateLayerMutation(layer) {
    const { id, x, y, name, typeData, code } = layer;

    return graph.request(
      `
        mutation updateLayer($id: String!, $layerInput: LayerInput!) {
          updateLayer(id: $id, layerInput: $layerInput) {
            id
          }
        }
      `,
      { id: layer.id, layerInput: { x, y, name, typeData, code } }
    );
  }

  const debouncedUpdateLayerMutation = debounce(updateLayerMutation, 300);

  function updateLayer(state, layer) {
    const { id, x, y, name, typeData, code } = layer;
    const layers = [...state.activeVersion.layers];

    const index = layers.findIndex(l => l.id === id);

    if (index !== -1) {
      layers[index] = layer;
    }

    debouncedUpdateLayerMutation(layer);

    return {
      activeVersion: {
        ...state.activeVersion,
        layers
      }
    };
  }
  async function promoteLayer(state, { id }) {
    await graph.request(
      `
          mutation promoteLayer($id: String!) {
            promoteLayer(id: $id) {
              id
            }
          }
        `,
      { id }
    );

    return fetchVersion(state, {
      versionId: state.activeVersion.id,
      projectId: state.activeVersion.projectId
    });
  }

  async function demoteLayer(state, { id }) {
    await graph.request(
      `
          mutation demoteLayer($id: String!) {
            demoteLayer(id: $id) {
              id
            }
          }
        `,
      { id }
    );

    return fetchVersion(state, {
      versionId: state.activeVersion.id,
      projectId: state.activeVersion.projectId
    });
  }

  function publishVersion(state) {
    graph.request(
      `
        mutation publishVersion($projectId: String!, $versionId: String!) {
          publishProjectVersion(projectId: $projectId, versionId: $versionId) {
            id
            publishedVersionId
          }
        }
      `,
      {
        projectId: state.activeVersion.projectId,
        versionId: state.activeVersion.id
      }
    );
  }

  function clearActiveVersion() {
    return {
      activeVersion: null
    };
  }

  return {
    fetchVersion,
    clearActiveVersion,
    publishVersion,
    createLayer,
    deleteLayer,
    updateLayer,
    promoteLayer,
    demoteLayer
  };
}
