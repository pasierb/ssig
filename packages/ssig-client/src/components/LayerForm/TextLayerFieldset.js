import { h } from "preact";
import { InputField } from "./elements";
import ShadowFieldset from './ShadowFieldset';

const TextLayerFieldset = props => {
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
        label="text"
        value={data.text}
        onInput={handleChange("text")}
      />
      <InputField
        label="color"
        value={data.color}
        onInput={handleChange("color")}
      />
      <InputField
        label="font size"
        value={data.fontSize}
        onInput={handleChange("fontSize", Number)}
      />
      <ShadowFieldset {...props} />
    </div>
  );
};

export default TextLayerFieldset;
