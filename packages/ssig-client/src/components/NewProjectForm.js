import { h, Component } from "preact";

export default class NewProjectForm extends Component {
  state = {};

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name } = this.state;

    this.props.onSubmit({ name });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              onInput={this.handleChange}
              className="input"
              type="text"
              name="name"
              placeholder="Text input"
            />
          </div>
        </div>
        <div className="field">
          <button className="button" type="submit">
            Create
          </button>
        </div>
      </form>
    );
  }
}
