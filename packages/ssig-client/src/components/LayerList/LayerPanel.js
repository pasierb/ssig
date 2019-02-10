import { h } from "preact";
import styles from "./LayerPanel.scss";

const LAYER_TYPE_ICON_CLASS = {
  text: "fas fa-font",
  image: "fas fa-image",
  rectangular: "fas fa-square"
};

export default function LayerPanel(props) {
  const { layer, onClick, isActive, children } = props;

  const handleClick = e => {
    e.preventDefault();
    onClick(layer);
  };

  const titleClass = ["panel-block", isActive ? "is-active" : null]
    .filter(i => i)
    .join(" ");

  const contentClass = [
    "panel-block",
    styles.LayerPanel__content,
    isActive ? styles["LayerPanel__content--active"] : null
  ]
    .filter(i => i)
    .join(" ");

  return (
    <nav className={["panel", styles.LayerPanel].join(" ")}>
      <a className={titleClass} onClick={handleClick}>
        <span class="panel-icon">
          <i class={LAYER_TYPE_ICON_CLASS[layer.type]} aria-hidden="true" />
        </span>
        {layer.name}
      </a>
      <div className={contentClass}>{children}</div>
    </nav>
  );
}
