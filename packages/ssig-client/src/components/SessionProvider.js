import { h, Component } from "preact";
import { createContext } from "preact-context";
import graph from "../graph";

const SessionContext = createContext({
  store: {},
  actions: {}
});

function authenticateQuery() {
  return graph.request(`
    query {
      me {
        username
      }
    }
  `);
}

export const SessionConsumer = SessionContext.Consumer;

export default class SessionProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: {
        isAuthenticating: false,
        currentUser: null
      },
      actions: {
        authenticate: this.authenticate
      }
    };
  }

  componentWillMount() {
    this.authenticate();
  }

  authenticate = () => {
    this.setState({ store: { isAuthenticating: true, currentUser: null } });

    authenticateQuery().then(({ me }) => {
      this.setState({ store: { isAuthenticating: false, currentUser: me } });
    });
  };

  render(props) {
    return (
      <SessionContext.Provider value={this.state}>
        {props.children}
      </SessionContext.Provider>
    );
  }
}
