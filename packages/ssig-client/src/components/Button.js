import { h } from "preact";
import Icon from "./Icon";

export default function Button(props) {
  const {
    component: AsComponent = "button",
    icon,
    children,
    className = "",
    ...rest
  } = props;

  return (
    <AsComponent className={`button ${className}`} {...rest}>
      {icon && <span className="icon">{icon()}</span>}
      {children && children.length > 0 && <span>{children}</span>}
    </AsComponent>
  );
}
