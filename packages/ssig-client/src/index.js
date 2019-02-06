import { h } from "preact";
import App from "./components/app";
import createStore from "unistore";
import devtools from "unistore/devtools";
import { Provider } from "unistore/preact";
import "./style";
import graph from "./graph";

const initialState = {
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
  store.setState({ currentUser: me });
});

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
