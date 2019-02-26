import { h } from "preact";
import LayerForm from "../LayerForm";

export default function LayerListItem(props) {
  const { layer, version, onChange, onPromote, onDemote, onDelete } = props;

  return (
    <div>
      <LayerForm
        onChange={onChange}
        layer={layer}
        disabled={version.publishedAt}
      />
      <p className="buttons">
        <button
          disabled={!onPromote}
          className="button is-small"
          onClick={() => onPromote && onPromote(layer)}
        >
          <span className="icon">
            <i className="fas fa-arrow-up" />
          </span>
        </button>
        <button
          disabled={!onDemote}
          className="button is-small"
          onClick={() => onDemote && onDemote(layer)}
        >
          <span className="icon">
            <i className="fas fa-arrow-down" />
          </span>
        </button>
        <button
          disabled={!onDelete}
          className="button is-small is-danger"
          onClick={() => onDelete(layer)}
        >
          <span className="icon">
            <i className="fas fa-trash" />
          </span>
        </button>
      </p>
    </div>
  );
}
