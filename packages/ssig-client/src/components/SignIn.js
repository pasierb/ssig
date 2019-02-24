import { h, Component } from "preact";

export default class SignIn extends Component {
  hadleTwitterSignIn = () => {
    window.location = '/auth/twitter';
  }

  render() {
    return (
      <div>
        <h3 className="title is-3">Sign in</h3>

        {/* <a className="button" href="/auth/twitter"> */}
        <button className="button" onClick={this.hadleTwitterSignIn}>
          <span className="icon">
            <i className="fab fa-twitter" />
          </span>
          <span>Twitter</span>
        </button>
      </div>
    );
  }
}
