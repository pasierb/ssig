import { h, Component } from "preact";
import Modal from "./Modal";
import LayerList from "./LayerList";
import LayerForm from "./LayerForm";
import VersionPreview from "./VersionPreview";
import VersionForm from "./VersionForm";

export default class Editor extends Component {
  state = {
    versionModalOpen: false
  };

  toggleVersionModal = () => {
    this.setState(state => ({
      versionModalOpen: !state.versionModalOpen
    }));
  };

  render(props, state) {
    const { version, layers, onLayerChange, onVersionPublish } = props;

    return (
      <div className="columns">
        <div className="column">
          <VersionPreview layers={layers} version={version} />
        </div>
        <div className="column">
          <button className="button" onClick={this.toggleVersionModal}>Version setting</button>
          <button className="button" disabled={version.publishedAt} onClick={onVersionPublish}>Version publish</button>
          <h4 className="title is-4">Layers</h4>
          <LayerList
            layers={layers}
            renderItem={layer => (
              <LayerForm onChange={onLayerChange} layer={layer} />
            )}
          />
        </div>
        <Modal
          isOpen={state.versionModalOpen}
          onClose={this.toggleVersionModal}
        >
          <VersionForm version={version} />
        </Modal>
      </div>
    );
  }
}
