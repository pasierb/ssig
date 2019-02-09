import { h, Component } from "preact";
import { route } from "preact-router";

export default class Redirect extends Component {
  componentWillMount() {
    setTimeout(() => {
      route(this.props.to, true);
    }, 0)
  }

  render() {
    return <div />;
  }
}
