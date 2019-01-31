import { h } from "preact";
import LayerList from "./LayerList";
import LayerForm from "./LayerForm";
import VersionPreview from "./VersionPreview";

export default function Editor(props) {
  const { layers, onLayerChange } = props;

  return (
    <div className="columns">
      <div className="column">
        <VersionPreview layers={layers} />
      </div>
      <div className="column">
        <LayerList
          layers={layers}
          renderItem={layer => (
            <LayerForm onChange={onLayerChange} layer={layer} />
          )}
        />
      </div>
    </div>
  );
}
