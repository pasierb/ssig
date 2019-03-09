import { h } from "preact";

import "./style/index.scss";
import '@webcomponents/custom-elements'

import App from "./components/App";
import { Provider } from "unistore/preact";
import store from "./store";

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
