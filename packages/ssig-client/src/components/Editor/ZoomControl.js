import { h, Component } from "preact";
import styles from "./ZoomControl.scss";

export default class ZoomControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || 100
    };
  }

  handleInput = e => {
    const { onChange } = this.props;

    this.setState(
      {
        value: Number(e.target.value)
      },
      () => {
        onChange(this.state.value);
      }
    );
  };

  handleIncrement = (rate = 1.25) => () => {
    const { onChange } = this.props;

    this.setState(
      state => ({
        value: Math.round(state.value * rate)
      }),
      () => {
        onChange(this.state.value);
      }
    );
  };

  handleDecrement = (rate = 1.25) => () => {
    const { onChange } = this.props;

    this.setState(
      state => ({
        value: Math.round(state.value / rate)
      }),
      () => {
        onChange(this.state.value);
      }
    );
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  render(props, state) {
    const { value } = state;

    return (
      <div className={`${styles.ZoomControl} field has-addons`}>
        <div className="control">
          <button className="button" onClick={this.handleDecrement()}>
            <i className="fas fa-search-minus" />
          </button>
        </div>
        <div className="control">
          <input
            className="input"
            type="number"
            value={value}
            onInput={this.handleInput}
          />
        </div>
        <div className="control">
          <button className="button" onClick={this.handleIncrement()}>
            <i className="fas fa-search-plus" />
          </button>
        </div>
      </div>
    );
  }
}
