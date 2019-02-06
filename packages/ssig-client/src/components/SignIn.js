import { h, Component } from "preact";

export default class SignIn extends Component {
  handleTwitterLoginClick = () => {
    window.open("/auth/twitter", "_ssig_auth");
  };

  render() {
    return (
      <div>
        <button className="button" onClick={this.handleTwitterLoginClick}>
          Twitter
        </button>
      </div>
    );
  }
}
