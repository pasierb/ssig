import { h, Component } from "preact";
import Page from "../components/Page";

export default class HomePage extends Component {
  render() {
    return (
      <Page>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Ssig is coming soon!</h1>
              <h2 className="subtitle">
                We are actively working on bringing you the tool you need.
              </h2>
            </div>
          </div>
        </section>
      </Page>
    );
  }
}
