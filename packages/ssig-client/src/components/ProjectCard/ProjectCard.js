import { h } from "preact";
import { Link } from "preact-router";

import VersionImage from '../VersionImage';
import styles from './ProjectCard.scss';

export default function ProjectCard(props) {
  const { project, version, children } = props;

  return (
    <div className={`card ${styles.ProjectCard}`}>
      {version && (
        <div className="card-image">
          <figure className="image">
            <VersionImage versionId={version.id} projectId={project.id} />
          </figure>
        </div>
      )}
      <div className="card-content">
        <div className="content">{children}</div>
      </div>
      <footer className="card-footer">
        <a
          href={`/api/v1/projects/${project.id}/versions/${version.id}/preview`}
          target="_blank"
          className="card-footer-item"
          title="preview"
        >
          <span className="icon">
            <i className="fas fa-eye" />
          </span>
        </a>
        <Link href={`/projects/${project.id}`} className="card-footer-item">
          <span className="icon">
            <i className="fas fa-edit" />
          </span>
        </Link>
      </footer>
    </div>
  );
}
