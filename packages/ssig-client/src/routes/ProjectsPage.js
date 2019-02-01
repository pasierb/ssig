import { h, Component } from "preact";
import { Link } from 'preact-router/match';
import client from "../graph";

const query = `
  query {
    projects {
      id
      name
      versions {
        id
      }
    }
  }
`;

export default class ProjectsPage extends Component {
  state = {
    projects: []
  };

  componentWillMount() {
    client.request(query).then(res => {
      this.setState({ projects: res.projects });
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Projects</h1>

        <ul>
          {this.state.projects.map(project => (
            <li>
              {project.name}
              {project.versions.map(version =>
                <Link href={`/projects/${project.id}/versions/${version.id}`}>{version.id}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
