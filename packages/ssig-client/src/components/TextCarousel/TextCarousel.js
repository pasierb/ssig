import { h, Component } from "preact";
import styles from "./TextCarousel.scss";

export default class TextCarousel extends Component {
  state = {
    currentIndex: 0,
    intervalHandle: null
  };

  componentDidMount() {
    const { interval, items } = this.props;

    const intervalHandle = setInterval(() => {
      this.setState(state => ({
        currentIndex:
          state.currentIndex >= items.length - 1 ? 0 : state.currentIndex + 1
      }));
    }, interval || 1000);

    this.setState({ intervalHandle });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalHandle);
  }

  render(props, state) {
    return (
      <span className={styles.TextCarousel}>
        {props.items.map((item, index) => (
          <span
            className={`${styles["TextCarousel__item"]} ${
              index === state.currentIndex
                ? styles["TextCarousel__item--active"]
                : styles["TextCarousel__item--inactive"]
            }`}
          >
            {item}
          </span>
        ))}
      </span>
    );
  }
}
