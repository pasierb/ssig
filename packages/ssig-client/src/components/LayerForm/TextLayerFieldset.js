import { h, Component } from "preact";

import { ColorField, Label, Input, Field, NumberField } from "./elements";
import ShadowFieldset from "./ShadowFieldset";
import FontSelectContainer from "../../containers/FontSelectContainer";
import Icon from "../Icon";
import Button from "../Button";

export default class TextLayerFieldset extends Component {
  constructor(props) {
    super(props);

    const { fontFamily, fontVariant, fontFile } = props.data;

    this.state = {
      ...props.data,
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

  handleTextAlignClick = textAlign => e => {
    e.preventDefault();

    const { onChange, data } = this.props;

    onChange({
      ...data,
      textAlign
    });
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
    const { data, onChange, disabled } = props;
    const { selectedFont } = state;
    const { textAlign = "left" } = data;

    const handleChange = (attribute, cast = a => a) => event => {
      onChange({
        ...data,
        [attribute]: cast(event.target.value)
      });
    };

    return (
      <div>
        <Field>
          <Label>text</Label>
          <textarea
            className="textarea is-small"
            disabled={disabled}
            value={data.text}
            onInput={handleChange("text")}
          />
        </Field>
        <ColorField
          label="color"
          disabled={disabled}
          value={data.color}
          onInput={handleChange("color")}
        />
        <div className="field">
          <Label>Font family</Label>
          <div className="field has-addons">
            <p className="control">
              <FontSelectContainer
                as={Input}
                disabled={disabled}
                onChange={this.handleFontChange}
                value={data.fontFamily}
              />
            </p>
            <p className="control">
              <span className="select is-small">
                <select
                  onChange={this.handleFontVariantChange}
                  disabled={disabled}
                >
                  {selectedFont.variants.map(variant => (
                    <option value={variant}>{variant}</option>
                  ))}
                </select>
              </span>
            </p>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <NumberField
              label="font size"
              disabled={disabled}
              unit="px"
              value={data.fontSize}
              onInput={handleChange("fontSize", Number)}
            />
          </div>
          <div className="column">
            <NumberField
              label="max line length"
              disabled={disabled}
              value={data.maxLineLength}
              unit="chars"
              onInput={handleChange("maxLineLength", Number)}
            />
          </div>
        </div>
        <div className="field">
          <Label>Text align</Label>
          <div className="control">
            <div className="buttons has-addons">
              {["left", "center", "right"].map(direction => (
                <Button
                  className={direction === textAlign ? "is-static" : ""}
                  icon={() => <Icon icon={`align-${direction}`} />}
                  onClick={this.handleTextAlignClick(direction)}
                />
              ))}
            </div>
          </div>
        </div>
        <ShadowFieldset {...props} />
      </div>
    );
  }
}
