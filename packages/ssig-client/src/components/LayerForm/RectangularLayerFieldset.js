import { h } from "preact";
import { InputField } from "./elements";

export default function RectangularLayerFieldset(props) {
  const { data, onChange } = props;

  const handleChange = (attribute, cast = a => a) => event => {
    onChange({
      ...data,
      [attribute]: cast(event.target.value)
    });
  };

  return (
    <div>
      <div className="columns">
        <div className="column">
          <InputField type="number" required value={data.width} label="Width" onInput={handleChange("width", Number)} />
        </div>
        <div className="column">
          <InputField type="number" required value={data.height} label="Height" onInput={handleChange("height", Number)} />
        </div>
      </div>
      <InputField type="string" value={data.color} label="Color" onInput={handleChange("color")} />
    </div>
  );
}
