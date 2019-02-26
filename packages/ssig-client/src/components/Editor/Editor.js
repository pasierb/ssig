import { h, Component } from "preact";
import Modal from "../Modal";
import LayerList from "../LayerList";
import LayerListItem from "./LayerListItem";
import VersionPreview from "../VersionPreview";
import VersionForm from "../VersionForm";
import NewLayerForm from "../NewLayerForm";
import styles from "./Editor.scss";

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
    const {
      version,
      layers,
      onLayerChange,
      onVersionPublish,
      onLayerPromote,
      onLayerDemote,
      onLayerDelete
    } = props;

    const reversedLayers = [...layers].reverse();
    const disabled = !!version.publishedAt;

    return (
      <div className={styles.Editor}>
        <div className={styles["Editor__preview-container"]}>
          <div>
            <VersionPreview layers={layers} version={version} />
          </div>
        </div>
        <div>
          <div className="buttons">
            <button
              className="button"
              onClick={this.toggleVersionModal}
              disabled={disabled}
            >
              <span className="icon">
                <i className="fas fa-cog" />
              </span>
            </button>
            <button
              className="button"
              disabled={disabled}
              onClick={onVersionPublish}
            >
              <span className="icon">
                <i className="fas fa-upload" />
              </span>
            </button>
            <button
              className="button"
              onClick={this.toggleNewLayerModal}
              disabled={disabled}
            >
              <span className="icon">
                <i className="fas fa-plus" />
              </span>
            </button>
          </div>
          <h4 className="title is-4">Layers</h4>
          <LayerList
            layers={reversedLayers}
            renderItem={(layer, i) => (
              <LayerListItem
                key={layer.id}
                layer={layer}
                version={version}
                onChange={!disabled && onLayerChange}
                onDelete={!disabled && onLayerDelete}
                onPromote={!disabled && i > 0 && onLayerPromote}
                onDemote={!disabled && i < reversedLayers.length - 1 && onLayerDemote}
              />
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
