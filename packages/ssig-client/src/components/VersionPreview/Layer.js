import TextLayer from "./TextLayer";
import ImageLayer from "./ImageLayer";
import RectangularLayer from "./RectangularLayer";

const LAYER_TYPE_COMPONENT = {
  text: TextLayer,
  image: ImageLayer,
  rectangular: RectangularLayer
};

export default function Layer(props) {
  const { layer } = props;

  const LayerTypeComponent = LAYER_TYPE_COMPONENT[layer.type];

  if (!LayerTypeComponent) {
    return <div>Uknown layer type {layer.type}</div>;
  }

  return <LayerTypeComponent {...props} />;
}
