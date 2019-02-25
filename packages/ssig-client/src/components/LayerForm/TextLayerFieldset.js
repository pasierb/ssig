import { h, Component } from "preact";
import { InputField, Field, Label, Input } from "./elements";
import ShadowFieldset from "./ShadowFieldset";
import FontSelectContainer from "../../containers/FontSelectContainer";

export default class TextLayerFieldset extends Component {
  constructor(props) {
    super(props);

    const { fontFamily, fontVariant, fontFile } = props.data;

    this.state = {
      fontFamily,
      fontVariant,
      fontFile,
      selectedFont: {
        family: fontFamily,
        variants: [fontVariant],
        files: {
          [fontVariant]: fontFile
        }
      }
    };
  }

  handleFontChange = font => {
    const { onChange, data } = this.props;
    const fontFamily = font.family;
    const fontVariant = font.variants[0];
    const fontFile = font.files[fontVariant];

    this.setState(
      {
        selectedFont: font,
        fontFamily,
        fontVariant,
        fontFile
      },
      () => {
        onChange({
          ...data,
          fontFamily: this.state.fontFamily,
          fontVariant: this.state.fontVariant,
          fontFile: this.state.fontFile
        });
      }
    );
  };

  handleFontVariantChange = e => {
    const { onChange, data } = this.props;
    const fontVariant = e.target.value;

    this.setState(
      state => ({
        fontVariant,
        fontFile: state.selectedFont.files[fontVariant]
      }),
      () => {
        onChange({
          ...data,
          fontFamily: this.state.fontFamily,
          fontVariant: this.state.fontVariant,
          fontFile: this.state.fontFile
        });
      }
    );
  };

  render(props, state) {
    const { data, onChange } = props;
    const { selectedFont } = state;

    const handleChange = (attribute, cast = a => a) => event => {
      onChange({
        ...data,
        [attribute]: cast(event.target.value)
      });
    };

    return (
      <div>
        <InputField
          label="text"
          value={data.text}
          onInput={handleChange("text")}
        />
        <InputField
          label="color"
          value={data.color}
          onInput={handleChange("color")}
        />
        <div className="field">
          <Label>Font family</Label>
          <div className="field has-addons">
            <p className="control">
              <FontSelectContainer
                as={Input}
                onChange={this.handleFontChange}
                value={data.fontFamily}
              />
            </p>
            <p className="control">
              <span className="select is-small">
                <select onChange={this.handleFontVariantChange}>
                  {selectedFont.variants.map(variant => (
                    <option value={variant}>{variant}</option>
                  ))}
                </select>
              </span>
            </p>
          </div>
        </div>
        <InputField
          label="font size"
          value={data.fontSize}
          onInput={handleChange("fontSize", Number)}
        />
        <ShadowFieldset {...props} />
      </div>
    );
  }
}
