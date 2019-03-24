import { h, Component } from "preact";

import styles from "./HowItWorks.scss";

const examples = [
  {
    avatar: "https://i.imgur.com/FNACPpz.jpg",
    speaker: "Marge Simpson",
    title: "Automating boring tasks",
    result: "/assets/ssig_marge.jpeg"
  },
  {
    avatar: "https://i.imgur.com/DJhr1ou.jpg",
    speaker: "Pinky and Brain",
    title: "Taking over the world - retrospective",
    result: "/assets/ssig_pinky.jpeg"
  }
];

export default class HowItWorks extends Component {
  state = {
    currentIndex: 0,
    intervalHandle: null
  };

  componentDidMount() {
    const intervalHandle = setInterval(() => {
      this.setState(state => ({
        currentIndex:
          state.currentIndex >= examples.length - 1 ? 0 : state.currentIndex + 1
      }));
    }, this.props.interval || 2000);

    this.setState({ intervalHandle });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalHandle);
  }

  render(props, state) {
    const example = examples[state.currentIndex];

    return (
      <div className={`columns ${styles.HowItWorks}`}>
        <div className={`column ${styles["HowItWorks__section"]}`}>
          <h5 className="title is-5 has-text-info">Create a template</h5>

          <figure className="image is-2by1">
            <img src="/assets/editor_sample.png" />
          </figure>
        </div>
        <div className={`column ${styles["HowItWorks__section"]}`}>
          <h5 className="title is-5 has-text-info">Change values</h5>

          <code>
            https://ssig.io/api/v1/projects/YOUR_PROJECT_ID ?speaker.text=
            <strong>{example.speaker}</strong> &title.text=
            <strong>{example.title}</strong> &avatar.imageUri=
            <strong>{example.avatar}</strong>
          </code>
        </div>
        <div className={`column ${styles["HowItWorks__section"]}`}>
          <h5 className="title is-5 has-text-info">Get your image</h5>

          <figure className="image is-2by1">
            <img src={example.result} />
          </figure>
        </div>
      </div>
    );
  }
}
