import { h, Component } from "preact";

import Page from "../components/Page";
import HowItWorks from "../components/HowItWorks";
import TextCarousel from "../components/TextCarousel";
import styles from "./HomePage.scss";

export default class HomePage extends Component {
  render() {
    return (
      <Page noPadding className={styles.HomePage}>
        <section className="hero is-medium is-light">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-4 level">
                  <h1 className="title is-1 level-item">
                    <span className="brand has-text-primary">Ssig</span>
                  </h1>
                </div>
                <div className="column">
                  <h2 className="subtitle">
                    Image automation service for your&nbsp;
                    <strong>
                      <TextCarousel
                        interval={1500}
                        items={[
                          "meetup",
                          "social media",
                          "email campaing",
                          "blog"
                        ]}
                      />
                    </strong>
                    .
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="title is-3">How it works?</h2>
          <HowItWorks interval={3000} />
        </section>
      </Page>
    );
  }
}
