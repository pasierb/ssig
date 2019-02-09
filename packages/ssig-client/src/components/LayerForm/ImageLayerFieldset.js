import { h } from "preact";
import { InputField } from "./elements";
import ShadowFieldset from './ShadowFieldset';

const ImageLayerFieldset = props => {
  const { data, onChange } = props;

  const handleChange = (attribute, cast = a => a) => event => {
    onChange({
      ...data,
      [attribute]: cast(event.target.value)
    });
  };

  return (
    <fieldset>
      <InputField
        label="Image"
        value={data.imageUri}
        onInput={handleChange("imageUri")}
      />
      <ShadowFieldset {...props} />
    </fieldset>
  );
};

export default ImageLayerFieldset;
