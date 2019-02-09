import { h, Component } from "preact";
import { Field, InputField } from "./elements";
import TextLayerFieldset from "./TextLayerFieldset";
import ImageLayerFieldset from "./ImageLayerFieldset";
import RectangularLayerFieldset from "./RectangularLayerFieldset";

const TYPE_FIELDSET = {
  text: TextLayerFieldset,
  image: ImageLayerFieldset,
  rectangular: RectangularLayerFieldset
};

export default class LayerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layer: Object.assign({}, props.layer)
    };
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  updateState = (updateFn, cb) => {
    const { onChange } = this.props;

    this.setState(updateFn, () => {
      if (cb) {
        cb;
      }

      if (onChange) {
        onChange(this.state.layer);
      }
    });
  };

  handleChange = (attribute, cast = a => a) => event => {
    this.updateState(state => {
      const { layer } = state;

      return {
        ...state,
        layer: { ...layer, [attribute]: cast(event.target.value) }
      };
    });
  };

  handleTypeDataChange = typeData => {
    this.updateState(state => {
      const { layer } = state;

      return {
        ...state,
        layer: {
          ...layer,
          typeData
        }
      };
    });
  };

  render(props, state) {
    const { onSubmit } = props;
    const { layer } = state;
    const TypeFieldsetComponent = TYPE_FIELDSET[layer.type];

    return (
      <form onSubmit={e => onSubmit && this.handleSubmit(e)}>
        <InputField
          label="name"
          value={layer.name}
          onInput={this.handleChange("name")}
        />
        <InputField
          label="code"
          value={layer.code}
          onInput={this.handleChange("code")}
        />
        <div className="columns">
          <div className="column">
            <InputField
              label="x"
              type="number"
              value={layer.x}
              onInput={this.handleChange("x", Number)}
            />
          </div>
          <div className="column">
            <InputField
              label="y"
              type="number"
              value={layer.y}
              onInput={this.handleChange("y", Number)}
            />
          </div>
        </div>
        <TypeFieldsetComponent
          data={layer.typeData}
          onChange={this.handleTypeDataChange}
        />
        {onSubmit && (
          <Field>
            <button className="button is-primary" type="submit">
              Save
            </button>
          </Field>
        )}
      </form>
    );
  }
}
