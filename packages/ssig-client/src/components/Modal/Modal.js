import { h, Component } from "preact";
import Portal from "preact-portal";

import styles from "./Modal.scss";

export default class Modal extends Component {
  listenClose = e => {
    if (this.props.isOpen && e.code === "Escape") {
      this.props.onClose();
    }
  };

  componentDidMount() {
    document.addEventListener("keyup", this.listenClose);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.listenClose);
  }

  render(props) {
    if (!this.props.isOpen) return null;

    return (
      <Portal into="body">
        <div className={`modal is-active ${styles.Modal}`}>
          <div className={`modal-background ${styles.Modal__backdrop}`} onClick={props.onClose} />
          <div className={`modal-content ${styles.Modal__content}`}>
            <div className="box">{this.props.children}</div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={props.onClose}
          />
        </div>
      </Portal>
    );
  }
}
