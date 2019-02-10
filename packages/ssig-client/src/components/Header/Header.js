import { h, Component } from "preact";
import { connect } from "unistore/preact";
import { Link } from "preact-router/match";
import Modal from "../Modal";
import SignIn from "../SignIn";

class Header extends Component {
  state = {
    signInModalOpen: false
  };

  handleToggleSignInModal = () => {
    this.setState(state => ({
      signInModalOpen: !state.signInModalOpen
    }));
  };

  render({ currentUser }, state) {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/" className="navbar-item">
            Ssig
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            {currentUser && (
              <Link className="navbar-item" href="/projects">
                Projects
              </Link>
            )}
          </div>
          <div className="navbar-end">
            {currentUser ? (
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  <span className="icon">
                    <i className="fas fa-user" />
                  </span>
                  <span>{currentUser.username}</span>
                </a>

                <div class="navbar-dropdown">
                  <a class="navbar-item" href="/auth/signOut">
                    <span className="icon">
                      <i className="fas fa-sign-out-alt" />
                    </span>
                    <span>Sign out</span>
                  </a>
                </div>
              </div>
            ) : (
              <div class="navbar-item">
                <div class="buttons">
                  <button
                    className="button"
                    onClick={this.handleToggleSignInModal}
                  >
                    <span className="icon">
                      <i className="fas fa-sign-in-alt" />
                    </span>
                    <span>Sign in</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <Modal
          isOpen={state.signInModalOpen}
          onClose={this.handleToggleSignInModal}
        >
          <SignIn />
        </Modal>
      </nav>
    );
  }
}

export default connect("currentUser")(({ currentUser }) => (
  <Header currentUser={currentUser} />
));
