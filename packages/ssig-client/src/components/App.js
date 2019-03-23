import { h, Component } from "preact";
import { Router } from "preact-router";
import PrivateRoute from "./PrivateRoute";
import SessionProvider from "./SessionProvider";

// Code-splitting is automated for routes
import HomePage from "../routes/HomePage";
import ProjectsPage from "../routes/ProjectsPage";
import ProjectPage from "../routes/ProjectPage";
import VersionEditPage from "../routes/VersionEditPage";
import VersionPage from "../routes/VersionPage";
import NotFoundPage from "../routes/NotFoundPage";

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <SessionProvider>
          <Router onChange={this.handleRoute}>
            <HomePage path="/" />
            <PrivateRoute path="/projects" component={ProjectsPage} />
            <PrivateRoute path="/projects/:projectId" component={ProjectPage} />
            <PrivateRoute
              path="/projects/:projectId/versions/:versionId/edit"
              component={VersionEditPage}
            />
            <PrivateRoute
              path="/projects/:projectId/versions/:versionId"
              component={VersionPage}
            />
            <NotFoundPage default />
          </Router>
        </SessionProvider>
      </div>
    );
  }
}
