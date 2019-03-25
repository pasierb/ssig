import graph from "../graph";
import debounce from "lodash/debounce";

export default function activeVersionActions(store) {
  function fetchVersion(state, { projectId, versionId }) {
    return graph
      .request(
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
                xUnit
                y
                yUnit
                z
              }
            }
          }
        }
      `,
        { projectId, versionId }
      )
      .then(({ project }) => ({
        activeVersion: project.version
      }));
  }

  function createLayer(state, { type, name }) {
    return graph
      .request(
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
      )
      .then(({ createLayer }) => ({
        activeVersion: {
          ...state.activeVersion,
          layers: [...state.activeVersion.layers, createLayer]
        }
      }));
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
    const { id, x, y, xUnit, yUnit, name, typeData, code } = layer;
    const { imageData, ...restImageData } = typeData;

    return graph.request(
      `
        mutation updateLayer($id: String!, $layerInput: LayerInput!) {
          updateLayer(id: $id, layerInput: $layerInput) {
            id
          }
        }
      `,
      {
        id,
        layerInput: { x, y, xUnit, yUnit, name, typeData: restImageData, code }
      }
    );
  }

  const debouncedUpdateLayerMutation = debounce(updateLayerMutation, 300);

  function updateLayer(state, layer) {
    const { id } = layer;
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
  function promoteLayer(state, { id }) {
    return graph
      .request(
        `
          mutation promoteLayer($id: String!) {
            promoteLayer(id: $id) {
              id
            }
          }
        `,
        { id }
      )
      .then(() =>
        fetchVersion(state, {
          versionId: state.activeVersion.id,
          projectId: state.activeVersion.projectId
        })
      );
  }

  function demoteLayer(state, { id }) {
    return graph
      .request(
        `
          mutation demoteLayer($id: String!) {
            demoteLayer(id: $id) {
              id
            }
          }
        `,
        { id }
      )
      .then(() =>
        fetchVersion(state, {
          versionId: state.activeVersion.id,
          projectId: state.activeVersion.projectId
        })
      );
  }

  function publishVersion(state) {
    return graph.request(
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
