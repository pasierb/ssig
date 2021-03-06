import { h, Component } from "preact";
import Button from "./Button";
import Icon from "./Icon";

export default class ProjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    const { name } = this.state;
    const { id, onSubmit } = this.props;

    return onSubmit({ id, name });
  };

  handleDelete = event => {
    event.preventDefault();

    const { id } = this.props;

    this.props.onDelete(id);
  };

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value
    });
  };

  render(props, state) {
    const { onDelete } = props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              type="text"
              required
              className="input"
              value={state.name}
              onInput={this.handleChange("name")}
            />
          </div>
        </div>
        <div className="field">
          <div className="buttons is-right">
            <Button type="submit">Save</Button>
            {onDelete && (
              <Button
                className="is-danger"
                onClick={this.handleDelete}
                icon={Icon.Delete}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </form>
    );
  }
}
