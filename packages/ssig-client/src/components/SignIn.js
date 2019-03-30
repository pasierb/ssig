import { h, Component } from "preact";

import Button from "./Button";

export default class SignIn extends Component {
  hadleTwitterSignIn = () => {
    window.location = "/api/auth/twitter";
  };

  render() {
    return (
      <div>
        <h3 className="title is-3">Sign in</h3>

        <div className="columns">
          <div className="column">
            <Button
              onClick={this.hadleTwitterSignIn}
              icon={() => <i className="fab fa-twitter" />}
            >
              Twitter
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
