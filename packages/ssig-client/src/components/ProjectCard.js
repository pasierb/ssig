import { h } from "preact";
import { Link } from "preact-router";

export default function ProjectCard(props) {
  const { project, version } = props;

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
        <div className="content">
          <p className="title is-4">{project.name}</p>
        </div>
      </div>
      <footer className="card-footer">
        <Link
          href={`/projects/${project.id}/versions/${version.id}/edit`}
          className="card-footer-item"
        >
          Edit
        </Link>
      </footer>
    </div>
  );
}
