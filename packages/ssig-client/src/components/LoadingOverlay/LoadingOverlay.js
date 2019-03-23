import { h, Component } from "preact";

import styles from "./LoadingOverlay.scss";

export default class LoadingOverlay extends Component {
  state = { showLoader: false, handle: null };

  componentWillMount() {
    this.setState({
      handle: setTimeout(() => {
        this.setState({ showLoader: true });
      }, 300)
    });
  }

  componentWillUnmount() {
    clearTimeout(this.state.handle);
  }

  render(props, state) {
    return state.showLoader ? (
      <div className={styles.LoadingOverlay}>{props.children}</div>
    ) : null;
  }
}
