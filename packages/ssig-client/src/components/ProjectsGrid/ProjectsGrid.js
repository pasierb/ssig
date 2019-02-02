import { h } from 'preact';
import styles from './ProjectsGrid.scss';

export default function ProjectsGrid(props) {
  const { projects, renderItem } = props;

  return (
    <div className={styles.ProjectsGrid}>
      {projects.map(project => renderItem(project))}
    </div>
  );
}