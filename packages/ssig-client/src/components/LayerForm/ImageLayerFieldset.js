import { h } from "preact";
import { InputField, Field, Label } from "./elements";
import ShadowFieldset from "./ShadowFieldset";

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
      <div className="columns">
        <div className="column">
          <InputField
            type="number"
            required
            value={data.width}
            label="Width"
            onInput={handleChange("width", Number)}
            disabled={disabled}
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
      <Field>
        <Label>repeat</Label>
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
      <InputField
        type="number"
        required
        value={data.borderRadius}
        label="Border radius"
        disabled={disabled}
        onInput={handleChange("borderRadius", Number)}
      />
      <ShadowFieldset {...props} />
    </fieldset>
  );
};

export default ImageLayerFieldset;
