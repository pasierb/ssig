import { h } from "preact";
import styles from "./ProjectsGrid.scss";

export default function ProjectsGrid(props) {
  const { children } = props;

  return <div className={styles.ProjectsGrid}>{children}</div>;
}
