import { h } from "preact";

import Redirect from "./Redirect";
import { SessionConsumer } from "./SessionProvider";
import LoadingOverlay from "./LoadingOverlay";

export default function PrivateRoute(props) {
  const { component: Component, ...rest } = props;

  return (
    <SessionConsumer>
      {({ store }) => {
        if (store.isAuthenticating) {
          return <LoadingOverlay>Auth...</LoadingOverlay>;
        }
        if (store.currentUser) {
          return <Component {...rest} />;
        }
        return <Redirect to="/" />;
      }}
    </SessionConsumer>
  );
}
