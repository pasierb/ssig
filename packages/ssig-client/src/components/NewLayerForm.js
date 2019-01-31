import { h, Component } from "preact";

export default class NewLayerForm extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData(event.target);

    this.props.onSubmit(
      {
        name: formData.get("name"),
        type: formData.get("type")
      },
      event
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" name="name" placeholder="Name" required />
          </div>
        </div>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <div class="select">
              <select name="type">
                <option value="text">Text</option>
                <option value="image">Image</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" type="submit">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}
