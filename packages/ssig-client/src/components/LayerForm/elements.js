import { h } from "preact";

const Field = props => <div className="field">{props.children}</div>;
const Label = props => (
  <label className="label is-small">{props.children}</label>
);

function Checkbox(props) {
  const { label, ...rest } = props;
  return (
    <label className="checkbox">
      <input type="checkbox" {...rest} />
      {label}
    </label>
  );
}

const Input = props => {
  const { className, ...rest } = props;

  return (
    <input
      {...rest}
      className={[className || "", "input", "is-small"].join(" ")}
    />
  );
};

const InputField = props => {
  const { label, ...rest } = props;

  return (
    <Field>
      <Label>{props.label}</Label>
      <div className="control">
        <input className="input is-small" {...rest} />
      </div>
    </Field>
  );
};

const ColorField = props => <InputField {...props} type="color" />;

const NumberField = props => {
  const { label, unit, ...restProps } = props;

  return (
    <Field>
      <Label>{label}</Label>
      <div className="field has-addons">
        <p className="control">
          <Input {...restProps} type="number" />
        </p>
        <p className="control">
          <span class="button is-static is-small">{unit}</span>
        </p>
      </div>
    </Field>
  );
};

function NumberUnitSelectField(props) {
  const { unit, onUnitChange, label, ...rest } = props;

  return (
    <Field>
      <Label>{label}</Label>
      <div className="field has-addons">
        <p className="control">
          <Input {...rest} type="number" />
        </p>
        <p className="control">
          <span className="select is-small">
            <select
              value={unit}
              onChange={onUnitChange}
              disabled={props.disabled}
            >
              <option value="">px</option>
              <option value="percentage">%</option>
            </select>
          </span>
        </p>
      </div>
    </Field>
  );
}

export {
  Field,
  Label,
  InputField,
  ColorField,
  Checkbox,
  Input,
  NumberUnitSelectField,
  NumberField,
};
