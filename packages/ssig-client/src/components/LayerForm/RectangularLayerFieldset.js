import { h } from "preact";
import { NumberField, ColorField, NumberUnitSelectField } from "./elements";
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
          <NumberUnitSelectField
            required
            value={data.width}
            unit={data.widthUnit}
            label="Width"
            disabled={disabled}
            onUnitChange={handleChange("widthUnit")}
            onInput={handleChange("width", Number)}
          />
        </div>
        <div className="column">
          <NumberUnitSelectField
            required
            value={data.height}
            unit={data.heightUnit}
            label="Height"
            disabled={disabled}
            onUnitChange={handleChange("heightUnit")}
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
      <div className="columns">
        <div className="column">
          <NumberField
            label="Border radius"
            value={data.borderRadius || 0}
            unit="px"
            disabled={disabled}
            onInput={handleChange("borderRadius", Number)}
          />
        </div>
        <div className="column">
          <NumberField
            label="Opacity"
            unit="%"
            value={data.opacity || 100}
            disabled={disabled}
            onInput={handleChange("opacity", Number)}
          />
        </div>
      </div>
      <ShadowFieldset {...props} />
    </fieldset>
  );
}
