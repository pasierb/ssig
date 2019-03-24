import { h, Component } from "preact";
import { Link } from "preact-router/match";

import Modal from "../Modal";
import SignIn from "../SignIn";
import { SessionConsumer } from "../SessionProvider";
import Button from "../Button";

import styles from "./Header.scss";

export default class Header extends Component {
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
      <SessionConsumer>
        {({ store }) => (
          <nav
            className="navbar is-primary"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <Link
                href="/"
                className={["navbar-item", styles.Header__brand, "brand"].join(
                  " "
                )}
              >
                Ssig
              </Link>
            </div>

            <div className="navbar-menu">
              <div className="navbar-start">
                {store.currentUser && (
                  <Link className="navbar-item" href="/projects">
                    Projects
                  </Link>
                )}
              </div>
              <div className="navbar-end">
                {store.currentUser ? (
                  <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                      <span className="icon">
                        <i className="fas fa-user" />
                      </span>
                      <span>{store.currentUser.username}</span>
                    </a>

                    <div class="navbar-dropdown">
                      <a class="navbar-item" href="/api/auth/signOut" native>
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
                      <Button
                        className="is-link"
                        icon={() => <i className="fas fa-sign-in-alt" />}
                        onClick={this.handleToggleSignInModal}
                      >
                        Sign in
                      </Button>
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
        )}
      </SessionConsumer>
    );
  }
}
