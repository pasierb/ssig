import createStore from "unistore";
import devtools from "unistore/devtools";

const initialState = {
  isAuthenticating: false,
  currentUser: undefined,
  projects: []
};

const store =
  process.env.NODE_ENV === "production"
    ? createStore(initialState)
    : devtools(createStore(initialState));

export default store;
