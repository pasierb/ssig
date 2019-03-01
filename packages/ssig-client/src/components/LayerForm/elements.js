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

export { Field, Label, InputField, ColorField, Checkbox, Input };
