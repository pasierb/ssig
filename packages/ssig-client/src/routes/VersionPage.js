import { h, Component } from "preact";
import NewLayerFormContainer from "../containers/NewLayerFormContainer";
import Modal from "../components/Modal";
import EditorContainer from "../containers/EditorContainer";

export default class VersionPage extends Component {
  state = {
    isNewLayerModalOpen: false,
    project: null
  };

  handleCreateLayer = () => {
    this.handleNewLayerModalToggle();
  };

  handleNewLayerModalToggle = () => {
    this.setState(state => {
      return {
        ...state,
        isNewLayerModalOpen: !state.isNewLayerModalOpen
      };
    });
  };

  render({ versionId, projectId }) {
    return (
      <div>
        <div className="container is-fluid">
          <h1 className="title">Version</h1>

          <button onClick={this.handleNewLayerModalToggle}>Add</button>

          <EditorContainer projectId={projectId} versionId={versionId} />
        </div>

        <Modal
          isOpen={this.state.isNewLayerModalOpen}
          onClose={this.handleNewLayerModalToggle}
        >
          <NewLayerFormContainer
            versionId={versionId}
            onSubmit={this.handleCreateLayer}
          />
        </Modal>
      </div>
    );
  }
}
