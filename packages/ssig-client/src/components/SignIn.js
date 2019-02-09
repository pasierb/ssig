import { h, Component } from "preact";

export default class SignIn extends Component {
  handleTwitterLoginClick = () => {
    window.open("/auth/twitter", "_ssig_auth");
  };

  render() {
    return (
      <div>
        <h3 className="title is-3">Sign in</h3>

        <button className="button" onClick={this.handleTwitterLoginClick}>
          <span className="icon">
            <i className="fab fa-twitter" />
          </span>
          <span>Twitter</span>
        </button>
      </div>
    );
  }
}
