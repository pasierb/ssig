import { h, Component } from "preact";

function TextInput(props) {
  const { label, ...rest } = props;

  return (
    <div className="field">
      <div className="control">
        <input className="input" type="text" placeholder={label} {...rest} />
      </div>
    </div>
  );
}

export default class VersionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version: { ...props.version }
    };
  }

  handleChange = (attribute, cast = a => a) => event => {
    const value = cast(event.target.value);
    const { onChange } = this.props;

    this.setState(
      state => {
        const version = {
          ...state.version,
          [attribute]: value
        };

        return {
          ...state,
          version
        };
      },
      () => {
        onChange(this.state.version);
      }
    );
  };

  render(props, state) {
    const { version } = state;

    return (
      <form>
        <TextInput
          label="width"
          type="number"
          value={version.width}
          onInput={this.handleChange("width", Number)}
        />
        <TextInput
          label="height"
          type="number"
          value={version.height}
          onInput={this.handleChange("width", Number)}
        />
        <TextInput
          label="background color"
          value={version.backgroundColor}
          onInput={this.handleChange("backgroundColor")}
        />
      </form>
    );
  }
}
