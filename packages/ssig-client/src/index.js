import { h } from "preact";
import App from "./components/App";
import createStore from "unistore";
import devtools from "unistore/devtools";
import { Provider } from "unistore/preact";
import "./style";
import graph from "./graph";

const initialState = {
  isAuthenticating: true,
  currentUser: undefined
};

const store =
  process.env.NODE_ENV === "production"
    ? createStore(initialState)
    : devtools(createStore(initialState));

const LOGGED_USER_QUERY = `
  query {
    me {
      username
    }
  }
`;

graph.request(LOGGED_USER_QUERY).then(({ me }) => {
  store.setState({ currentUser: me, isAuthenticating: false });
});

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
