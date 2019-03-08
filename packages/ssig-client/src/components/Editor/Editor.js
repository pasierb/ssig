import { h, Component } from "preact";
import Modal from "../Modal";
import LayerList from "../LayerList";
import LayerListItem from "./LayerListItem";
import VersionPreview from "../VersionPreview";
import VersionForm from "../VersionForm";
import NewLayerForm from "../NewLayerForm";
import styles from "./Editor.scss";
import ZoomControl from "./ZoomControl";

export default class Editor extends Component {
  state = {
    isVersionModalOpen: false,
    isNewLayerModalOpen: false,
    zoom: 100
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

  handleZoomChange = zoom => {
    this.setState({ zoom });
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
      <div className={styles.Editor} ref={el => (this._rootEl = el)}>
        <div className={styles["Editor__preview-container"]}>
          <VersionPreview
            scale={state.zoom / 100}
            layers={layers}
            version={version}
            onLayerChange={onLayerChange}
          />
        </div>
        <div className={styles["Editor__controls-container"]}>
          <div className="buttons">
            <button className="button is-medium">
              <i className="fas fa-arrow-left" />
            </button>
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
            <ZoomControl value={state.zoom} onChange={this.handleZoomChange} />
          </div>
        </div>
        <div className={styles["Editor__layers-container"]}>
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
                onDemote={
                  !disabled && i < reversedLayers.length - 1 && onLayerDemote
                }
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
