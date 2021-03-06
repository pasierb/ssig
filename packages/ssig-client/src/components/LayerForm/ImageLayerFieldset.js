import { h } from "preact";
import {
  InputField,
  Field,
  Label,
  NumberField,
  NumberUnitSelectField
} from "./elements";
import ShadowFieldset from "./ShadowFieldset";

function placeholditOnError(e) {
  e.target.src = "/assets/no_photo.jpg";
}

const ImageLayerFieldset = props => {
  const { data, onChange, disabled } = props;

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
        disabled={disabled}
        onInput={handleChange("imageUri")}
      />
      {data.imageUri && (
        <Field>
          <figure className="image">
            <img
              src={data.imageUri}
              onerror={placeholditOnError}
            />
          </figure>
        </Field>
      )}
      <div className="columns">
        <div className="column">
          <NumberUnitSelectField
            disabled={disabled}
            label="Width"
            value={data.width}
            unit={data.widthUnit}
            onUnitChange={handleChange("widthUnit")}
            onInput={handleChange("width", Number)}
          />
        </div>
        <div className="column">
          <NumberUnitSelectField
            disabled={disabled}
            label="Height"
            value={data.height}
            unit={data.heightUnit}
            onUnitChange={handleChange("heightUnit")}
            onInput={handleChange("height", Number)}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Field>
            <Label>Repeat</Label>
            <div className="select is-small">
              <select
                onChange={handleChange("repeat")}
                value={data.repeat}
                disabled={disabled}
              >
                <option value="">---</option>
                <option value="no-repeat">no-repeat</option>
                <option value="repeat">repeat</option>
                <option value="repeat-x">repeat-x</option>
                <option value="repeat-y">repeat-y</option>
              </select>
            </div>
          </Field>
        </div>
        <div className="column">
          <Field>
            <Label>Size</Label>
            <div className="select is-small">
              <select
                onChange={handleChange("size")}
                value={data.size}
                disabled={disabled}
              >
                <option value="">original</option>
                <option value="contain">contain</option>
                <option value="cover">cover</option>
              </select>
            </div>
          </Field>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <NumberField
            label="Border radius"
            required
            value={data.borderRadius}
            unit="px"
            disabled={disabled}
            onInput={handleChange("borderRadius", Number)}
          />
        </div>
        <div className="column" />
      </div>
      <ShadowFieldset {...props} />
    </fieldset>
  );
};

export default ImageLayerFieldset;
