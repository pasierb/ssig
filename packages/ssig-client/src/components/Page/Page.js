import { h } from "preact";
import Header from "../Header";
import Footer from "../Footer";

import styles from "./Page.scss";

export default function Page(props) {
  const { noPadding, className } = props;

  const rootClassNames = [
    styles.Page,
    className,
    noPadding && styles["Page--no-padding"]
  ].filter(a => a);

  return (
    <div className={rootClassNames.join(" ")}>
      <Header />
      <main className={`container ${styles["Page__main"]}`}>
        {props.children}
      </main>
      <Footer />
    </div>
  );
}
