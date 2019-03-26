import { h, Component } from "preact";
import styles from "./LayerPanel.scss";

const LAYER_TYPE_ICON_CLASS = {
  text: "fas fa-font",
  image: "fas fa-image",
  rectangular: "fas fa-square"
};

// credit: https://css-tricks.com/using-css-transitions-auto-dimensions/
function collapseSection(element) {
  const sectionHeight = element.scrollHeight;
  const elementTransition = element.style.transition;

  element.style.transition = "";

  requestAnimationFrame(function() {
    element.style.height = sectionHeight + "px";
    element.style.transition = elementTransition;

    requestAnimationFrame(function() {
      element.style.height = 0 + "px";
    });
  });
}

function expandSection(element) {
  const sectionHeight = element.scrollHeight;

  const transitionendListener = () => {
    element.removeEventListener("transitionend", transitionendListener);

    element.style.height = null;
  };

  element.addEventListener("transitionend", transitionendListener);
  element.style.height = sectionHeight + "px";
}

export default class LayerPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: !!props.isActive
    };
    this.contentRef = null;
  }

  handleClick = e => {
    e.preventDefault();

    this.toggle(() => this.props.onClick(this.props.layer));
  };

  expand = () => expandSection(this.contentRef);

  collapse = () => collapseSection(this.contentRef);

  toggle = cb => {
    this.setState(
      state => ({
        isActive: !state.isActive
      }),
      () => {
        if (this.state.isActive) {
          this.expand();
        } else {
          this.collapse();
        }

        cb && cb(this.state.isActive);
      }
    );
  };

  componentDidMount() {
    if (!this.state.isActive) {
      this.contentRef.style.height = 0;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive !== this.state.isActive) {
      this.toggle();
    }
  }

  render(props) {
    const { layer, isActive, children } = props;

    const titleClass = [
      "panel-block",
      styles["LayerPanel__header"],
      isActive ? styles["LayerPanel__header--is-active"] : null
    ]
      .filter(i => i)
      .join(" ");

    return (
      <nav className={["panel", styles.LayerPanel].join(" ")}>
        <a className={titleClass} onClick={this.handleClick}>
          <span class="panel-icon">
            <i class={LAYER_TYPE_ICON_CLASS[layer.type]} aria-hidden="true" />
          </span>
          {layer.name}
        </a>
        <div
          className={styles.LayerPanel__content}
          ref={el => (this.contentRef = el)}
        >
          <div className="panel-block">{children}</div>
        </div>
      </nav>
    );
  }
}
