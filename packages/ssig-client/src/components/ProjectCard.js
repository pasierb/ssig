import { h } from "preact";
import { Link } from "preact-router";

export default function ProjectCard(props) {
  const { project, version, children, renderFooter } = props;

  return (
    <div className="card">
      {version && (
        <div className="card-image">
          <figure className="image">
            <img
              src={`/api/v1/projects/${project.id}/versions/${
                version.id
              }/preview`}
            />
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
