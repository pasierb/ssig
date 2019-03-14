import { h, Component } from "preact";

export default class Dropdown extends Component {
  state = {
    isActive: false
  };

  handleClicks = event => {
    if (!this._menuEl.contains(event.target)) {
      // this.toggleMenu();
    }
  };

  toggleMenu = isActive => {
    this.setState(
      state => ({
        isActive: isActive !== undefined ? isActive : !state.isActive
      }),
      () => {
        if (this.state.isActive) {
          document.addEventListener("click", this.handleClicks);
        } else {
          document.removeEventListener("click", this.handleClicks);
        }
      }
    );
  };

  handleToggle = event => {
    event.preventDefault();

    this.toggleMenu();
  };

  render(props, state) {
    const { children, trigger } = props;

    return (
      <div className={`dropdown ${state.isActive && "is-active"}`}>
        <div className="dropdown-trigger" onClick={this.handleToggle}>
          {trigger || (
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>Dropdown button</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </button>
          )}
        </div>
        <div
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
          ref={el => {
            this._menuEl = el;
          }}
        >
          <div className="dropdown-content">{children}</div>
        </div>
      </div>
    );
  }
}
