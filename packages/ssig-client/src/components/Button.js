import { h } from "preact";

export default function Button(props) {
  const {
    children,
    className = "",
    icon: Icon,
    is,
    as: AsComponent = 'button',
    ...rest
  } = props;

  let buttonClasses = ["button", className];

  if (is) {
    buttonClasses = buttonClasses.concat(
      (Array.isArray(is) ? is : [is]).map(isType => `is-${isType}`)
    );
  }

  return (
    <AsComponent className={buttonClasses.join(" ")} {...rest}>
      {Icon && (
        <span className="icon">
          <Icon />
        </span>
      )}
      {children && <span>{children}</span>}
    </AsComponent>
  );
}
