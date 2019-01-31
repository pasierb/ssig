import { h } from "preact";

const Field = props => <div className="field">{props.children}</div>;
const Label = props => (
  <label className="label is-small">{props.children}</label>
);

const InputField = props => {
  const { label, ...rest } = props;

  return (
    <Field>
      <Label>{props.label}</Label>
      <input className="input is-small" {...rest} />
    </Field>
  );
};

export { Field, Label, InputField };
