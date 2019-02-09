import { h } from "preact";
import { connect } from "unistore/preact";
import Redirect from "./Redirect";

function PrivateRoute(props) {
  const { component: Component, isAuthenticating, currentUser, ...rest } = props;

  if (isAuthenticating) {
    return <div>Auth...</div>;
  }

  if (currentUser) {
    return <Component {...rest} />;
  }

  return <Redirect to="/" />;
}

export default connect(["isAuthenticating", "currentUser"])(PrivateRoute);
