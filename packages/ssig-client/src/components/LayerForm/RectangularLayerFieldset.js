import { h } from "preact";
import { InputField, ColorField } from "./elements";
import ShadowFieldset from "./ShadowFieldset";

export default function RectangularLayerFieldset(props) {
  const { data, onChange, disabled } = props;

  const handleChange = (attribute, cast = a => a) => event => {
    onChange({
      ...data,
      [attribute]: cast(event.target.value)
    });
  };

  return (
    <fieldset>
      <div className="columns">
        <div className="column">
          <InputField
            type="number"
            required
            value={data.width}
            label="Width"
            disabled={disabled}
            onInput={handleChange("width", Number)}
          />
        </div>
        <div className="column">
          <InputField
            type="number"
            required
            value={data.height}
            label="Height"
            disabled={disabled}
            onInput={handleChange("height", Number)}
          />
        </div>
      </div>
      <ColorField
        value={data.color}
        label="Color"
        disabled={disabled}
        onInput={handleChange("color")}
      />
      <InputField
        type="number"
        required
        value={data.borderRadius}
        label="Border radius"
        disabled={disabled}
        onInput={handleChange("borderRadius", Number)}
      />
      <InputField
        label="Opacity"
        type="number"
        min="0"
        max="100"
        value={data.opacity || 100}
        disabled={disabled}
        onInput={handleChange("opacity", Number)}
      />
      <ShadowFieldset {...props} />
    </fieldset>
  );
}
