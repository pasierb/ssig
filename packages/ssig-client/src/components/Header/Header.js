import { h, Component } from "preact";
import { Link } from "preact-router/match";

import { SessionConsumer } from "../SessionProvider";
import Button from "../Button";
import Icon from "../Icon";
import { startNewProject } from "../../helpers";
import styles from "./Header.scss";

export default function Header(props) {
  const handleNewProject = event => {
    event.preventDefault();

    startNewProject();
  };

  return (
    <SessionConsumer>
      {({ store, actions }) => (
        <nav
          className="navbar is-primary"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
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
                  <Link
                    className="navbar-item"
                    href="/projects"
                    activeClassName="is-active"
                  >
                    My projects
                  </Link>
                )}
                <div class="navbar-item">
                  <Button
                    icon={Icon.Add}
                    onClick={handleNewProject}
                    className="is-link"
                  >
                    Create project
                  </Button>
                </div>
              </div>
              <div className="navbar-end">
                {store.currentUser && !store.currentUser.isAnonymous ? (
                  <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                      <span className="icon">
                        <i className="fas fa-user" />
                      </span>
                      <span>
                        {store.isAnonymous ? "" : store.currentUser.username}
                      </span>
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
                        className="is-primary"
                        icon={() => <i className="fas fa-sign-in-alt" />}
                        onClick={actions.toggleSignInModal}
                      >
                        Log in
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </SessionConsumer>
  );
}
