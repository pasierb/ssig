import { h, Component } from "preact";
import throttle from "lodash/throttle";

import Modal from "../Modal";
import LayerList from "../LayerList";
import LayerListItem from "./LayerListItem";
import VersionPreview from "../VersionPreview";
import VersionForm from "../VersionForm";
import NewLayerForm from "../NewLayerForm";
import ZoomControl from "./ZoomControl";
import Button from "../Button";

import styles from "./Editor.scss";

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
    this._pinchZoom.scaleTo(zoom / 100);
  };

  handlePinchZoomChange = throttle(event => {
    this.setState({
      zoom: Math.round(event.target.scale * 100)
    });
  }, 100);

  componentDidMount() {
    this._pinchZoom.addEventListener("change", this.handlePinchZoomChange);
  }

  render(props, state) {
    const {
      version,
      layers,
      onBack,
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
        <pinch-zoom
          className={styles["Editor__preview-container"]}
          ref={el => (this._pinchZoom = el)}
        >
          <VersionPreview
            scale={state.zoom / 100}
            layers={layers}
            version={version}
            onLayerChange={onLayerChange}
          />
        </pinch-zoom>
        <Button
          className={`is-medium is-primary ${styles["Editor__back-button"]}`}
          onClick={onBack}
          icon={() => <i className="fas fa-arrow-left" />}
        />
        <div className={styles["Editor__zoom-container"]}>
          <ZoomControl value={state.zoom} onChange={this.handleZoomChange} />
        </div>
        <div className={styles["Editor__controls-container"]}>
          <div className="buttons">
            <Button
              className="is-link"
              onClick={this.toggleVersionModal}
              icon={() => <i className="fas fa-cog" />}
              disabled={disabled}
            />
            <Button
              className="is-link"
              onClick={onVersionPublish}
              icon={() => <i className="fas fa-upload" />}
              disabled={disabled}
            />
            <Button
              className="is-link"
              onClick={this.toggleNewLayerModal}
              icon={() => <i className="fas fa-plus" />}
              disabled={disabled}
            />
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
