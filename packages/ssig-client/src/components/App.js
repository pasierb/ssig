import { h, Component } from "preact";
import { Router } from "preact-router";

import PrivateRoute from './PrivateRoute';
import Header from "./Header";
import Footer from "./Footer";

// Code-splitting is automated for routes
import HomePage from "../routes/HomePage";
import ProjectsPage from "../routes/ProjectsPage";
import VersionPage from "../routes/VersionPage";

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
        <Header />
        <Router onChange={this.handleRoute}>
          <HomePage path="/" />
          <PrivateRoute path="/projects" component={ProjectsPage }/>
          <PrivateRoute path="/projects/:projectId/versions/:versionId/edit" component={VersionPage}/>
        </Router>
        <Footer />
      </div>
    );
  }
}
