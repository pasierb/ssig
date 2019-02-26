import { h, Component } from "preact";
import { Link } from "preact-router";
import { logger } from "../sentry";

export default class NotFoundPage extends Component {
  componentDidMount() {
    logger(Sentry =>
      Sentry.captureMessage(`Page does not exists: ${window.location.href}`)
    );
  }

  render() {
    return (
      <div className="container">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Page you are looking for is not here!</h1>
              <p className="subtitle">
                Go back to <Link href="/">home page</Link>.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
