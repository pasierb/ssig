import { h, Component } from "preact";
import Portal from "preact-portal";

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
        <div className="modal is-active">
          <div class="modal-background" />
          <div class="modal-content">
            <div className="box">{this.props.children}</div>
          </div>
          <button
            class="modal-close is-large"
            aria-label="close"
            onClick={props.onClose}
          />
        </div>
      </Portal>
    );
  }
}
