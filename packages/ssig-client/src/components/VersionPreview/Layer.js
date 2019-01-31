import TextLayer from "./TextLayer";
import ImageLayer from "./ImageLayer";

const LAYER_TYPE_COMPONENT = {
  text: TextLayer,
  image: ImageLayer
};

export default function Layer(props) {
  const { layer } = props;

  const LayerTypeComponent = LAYER_TYPE_COMPONENT[layer.type];

  if (!LayerTypeComponent) {
    return <div>Uknown layer type {layer.type}</div>;
  }

  return <LayerTypeComponent {...props} />;
}
