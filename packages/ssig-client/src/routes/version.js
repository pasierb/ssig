import { h, Component } from "preact";
import NewLayerFormContainer from "../containers/newLayerFormContainer";
import Modal from "../components/modal";
import EditorContainer from "../containers/EditorContainer";

export default class Version extends Component {
  state = {
    isNewLayerModalOpen: false,
    project: null
  };

  handleCreateLayer = () => {
    this.fetchData();
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

  render({ versionId }) {
    return (
      <div>
        <div className="container is-fluid">
          <h1 className="title">Version</h1>

          <button onClick={this.handleNewLayerModalToggle}>Add</button>

          <EditorContainer versionId={versionId} />
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
