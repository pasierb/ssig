import { h } from "preact";
import Dropdown from "./Dropdown";

export default function ContextMenu(props) {
  return (
    <Dropdown
      {...props}
      trigger={
        <a>
          <i className="fas fa-ellipsis-v" />
        </a>
      }
    />
  );
}
