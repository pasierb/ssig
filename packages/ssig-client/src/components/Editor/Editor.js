import { h, Component } from "preact";
import Modal from "../Modal";
import LayerList from "../LayerList";
import LayerForm from "../LayerForm";
import VersionPreview from "../VersionPreview";
import VersionForm from "../VersionForm";
import NewLayerForm from "../NewLayerForm";
import styles from './Editor.scss';

export default class Editor extends Component {
  state = {
    isVersionModalOpen: false,
    isNewLayerModalOpen: false
  };

  toggleVersionModal = () => {
    this.setState(state => ({
      isVersionModalOpen: !state.isVersionModalOpen
    }));
  };

  toggleNewLayerModal = () => {
    this.setState(state => ({
      isNewLayerModalOpen: !state.isNewLayerModalOpen
    }));
  };

  handleCreateLayer = layer => {
    this.toggleNewLayerModal();
    this.props.onLayerCreate(layer);
  };

  render(props, state) {
    const { version, layers, onLayerChange, onVersionPublish } = props;

    return (
      <div className={styles.Editor}>
        <div>
          <VersionPreview layers={layers} version={version} />
        </div>
        <div>
          <button className="button" onClick={this.toggleVersionModal}>
            Version setting
          </button>
          <button
            className="button"
            disabled={version.publishedAt}
            onClick={onVersionPublish}
          >
            Version publish
          </button>
          <button className="button" onClick={this.toggleNewLayerModal}>
            Add layer
          </button>
          <h4 className="title is-4">Layers</h4>
          <LayerList
            layers={layers}
            renderItem={layer => (
              <LayerForm key={layer.id} onChange={onLayerChange} layer={layer} />
            )}
          />
        </div>
        <Modal
          isOpen={state.isVersionModalOpen}
          onClose={this.toggleVersionModal}
        >
          <VersionForm version={version} />
        </Modal>

        <Modal
          isOpen={state.isNewLayerModalOpen}
          onClose={this.toggleNewLayerModal}
        >
          <NewLayerForm onSubmit={this.handleCreateLayer} />
        </Modal>
      </div>
    );
  }
}
