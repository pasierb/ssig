import { h, Component } from "preact";
import ProjectsGrid from "../components/ProjectsGrid";
import ProjectCard from "../components/ProjectCard";
import client from "../graph";

const query = `
  query {
    projects {
      id
      name
      versions(limit: 1) {
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

        <ProjectsGrid
          projects={this.state.projects}
          renderItem={project => (
            <ProjectCard project={project} version={project.versions[0]} />
          )}
        />
      </div>
    );
  }
}
