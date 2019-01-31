import { h } from "preact";
import { InputField } from "./elements";

const ImageLayerFieldset = props => {
  const { data, onChange } = props;

  const handleChange = (attribute, cast = a => a) => event => {
    onChange({
      ...data,
      [attribute]: cast(event.target.value)
    });
  };

  return (
    <div>
      <InputField
        label="Image"
        value={data.imageUri}
        onInput={handleChange("imageUri")}
      />
      {/* <InputField
        label="color"
        value={data.color}
        onInput={handleChange("color")}
      />
      <InputField
        label="font size"
        value={data.fontSize}
        onInput={handleChange("fontSize", Number)}
      /> */}
    </div>
  );
};

export default ImageLayerFieldset;
