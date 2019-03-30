import { h, Component } from "preact";
import { createContext } from "preact-context";

import graph from "../graph";
import Modal from "./Modal";
import SignIn from "./SignIn";

const SessionContext = createContext({
  signInModalOpen: false,
  store: {},
  actions: {}
});

function authenticateQuery() {
  return graph.request(`
    query {
      me {
        username
        isAnonymous
      }
    }
  `);
}

export const SessionConsumer = SessionContext.Consumer;

export default class SessionProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInModalOpen: false,
      store: {
        isAuthenticating: false,
        isAnonymous: false,
        currentUser: null
      },
      actions: {
        authenticate: this.authenticate,
        anonymousSignUp: this.anonymousSignUp,
        toggleSignInModal: this.handleToggleSignInModal
      }
    };
  }

  componentWillMount() {
    this.authenticate();
  }

  handleToggleSignInModal = () => {
    this.setState(state => ({
      signInModalOpen: !state.signInModalOpen
    }));
  };

  authenticate = () => {
    this.setState({ store: { isAuthenticating: true, currentUser: null } });

    return authenticateQuery().then(({ me }) => {
      this.setState({
        store: {
          isAuthenticating: false,
          isAnonymous: me && !!me.isAnonymous,
          currentUser: me
        }
      });

      return me;
    });
  };

  render(props, state) {
    const { store, actions } = state;

    return (
      <SessionContext.Provider value={{ store, actions }}>
        {props.children}

        <Modal
          isOpen={state.signInModalOpen}
          onClose={this.handleToggleSignInModal}
        >
          <SignIn />
        </Modal>
      </SessionContext.Provider>
    );
  }
}
