import { h } from "preact";
import Header from "../Header";
import Footer from "../Footer";

import styles from './Page.scss';

export default function Page(props) {
  return (
    <div className={styles.Page}>
      <Header />
      <main className={`container ${styles['Page__main']}`}>
        {props.children}
      </main>
      <Footer />
    </div>
  );
}
