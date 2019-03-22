import { h } from "preact";

const icons = {
  Edit: "edit",
  Copy: "copy",
  Delete: "trash",
  Add: "plus"
};

function Icon(props) {
  return <i className={`fas fa-${props.icon}`} />;
}

for (const icon in icons) {
  Icon[icon] = props => <Icon {...props} icon={icons[icon]} />;
}

export default Icon;
