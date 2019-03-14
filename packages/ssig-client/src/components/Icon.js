import { h } from "preact";

export const ICON_TYPE = {
  Edit: "edit",
  Delete: "trash",
  Copy: "copy",
  Back: "arrow-left",
  Settings: "cog",
  Publish: "upload",
  Add: "plus",
  Preview: "eye"
};

function Icon(props) {
  const { className = "", icon, ...rest } = props;

  return <i className={`fas fa-${icon} ${className}`} {...rest} />;
}

Object.keys(ICON_TYPE).forEach(iconType => {
  Icon[iconType] = props => <Icon {...props} icon={ICON_TYPE[iconType]} />;
});

export default Icon;
