import { h } from "preact";
import { InputField, ColorField, Checkbox, NumberField } from "./elements";

export default function ShadowFieldset(props) {
  const { data, onChange, disabled } = props;

  const handleChange = (attribute, cast = a => a) => event => {
    onChange({
      ...data,
      [attribute]: cast(event.target.value)
    });
  };

  const handleCheckboxChange = attribute => event => {
    onChange({
      ...data,
      [attribute]: !!event.target.checked
    });
  };

  return (
    <fieldset>
      <div className="control">
        <Checkbox
          disabled={disabled}
          onChange={handleCheckboxChange("shadow")}
          label="shadow"
          checked={data.shadow}
        />
      </div>
      {data.shadow && (
        <div>
          <div className="columns">
            <div className="column">
              <NumberField
                disabled={disabled}
                label="offset x"
                value={data.shadowOffsetX}
                unit="px"
                onInput={handleChange("shadowOffsetX", Number)}
              />
            </div>
            <div className="column">
              <NumberField
                disabled={disabled}
                label="offset y"
                value={data.shadowOffsetY}
                unit="px"
                onInput={handleChange("shadowOffsetY", Number)}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <ColorField
                label="color"
                disabled={disabled}
                onInput={handleChange("shadowColor")}
                value={data.shadowColor}
              />
            </div>
            <div className="column">
              <NumberField
                label="blur"
                disabled={disabled}
                value={data.shadowBlur}
                unit="px"
                onInput={handleChange("shadowBlur", Number)}
              />
            </div>
          </div>
        </div>
      )}
    </fieldset>
  );
}
