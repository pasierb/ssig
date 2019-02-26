import { h, Component } from "preact";
import styles from "./Autocomplete.scss";

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      value: props.value,
      searchTerm: props.value
    };
  }

  handleInput = e => {
    const value = e.target.value;

    this.setState({ isActive: true, searchTerm: value }, () => {
      this.props.onSearch(this.state.searchTerm);
    });
  };

  handleBlur = e => {
    setTimeout(() => {
      this.setState({ isActive: false });
    }, 100);
  };

  handleSelect = value => e => {
    e.preventDefault();

    this.setState({ value, searchTerm: value, isActive: false }, () => {
      this.props.onChange(this.state.value);
    });
  };

  handleFocus = e => {
    const { isActive } = this.state;
    const { choices } = this.props

    if (!isActive && choices.length > 0) {
      this.setState({ isActive: true });
    }
  };

  render(props, state) {
    const { disabled, as: AsComponent } = props;
    const listClass = [
      "menu-list",
      styles["Autocomplete__list"],
      state.isActive ? styles["Autocomplete__list--active"] : null
    ]
      .filter(a => a)
      .join(" ");

    return (
      <div className={styles.Autocomplete}>
        {AsComponent ? (
          <AsComponent
            disabled={disabled}
            onInput={this.handleInput}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            value={state.searchTerm}
          />
        ) : (
          <input
            className="input"
            disabled={disabled}
            value={state.searchTerm}
            onInput={this.handleInput}
            onBlur={this.handleBlur}
          />
        )}
        <div className={styles["Autocomplete__list-container"]}>
          <ul className={listClass}>
            {props.choices.map(item => (
              <li>
                <a role="button" onClick={this.handleSelect(item)}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
