import { h } from 'preact';
import styles from './ProjectsGrid.scss';

export default function ProjectsGrid(props) {
  const { projects, renderItem, renderBefore, renderAfter } = props;

  return (
    <div className={styles.ProjectsGrid}>
      {renderBefore && renderBefore()}
      {projects.map(project => renderItem(project))}
      {renderAfter && renderAfter()}
    </div>
  );
}