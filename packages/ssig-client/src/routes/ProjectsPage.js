import { h, Component } from "preact";
import ProjectsGrid from "../components/ProjectsGrid";
import ProjectCard from "../components/ProjectCard";
import Modal from "../components/Modal";
import NewProjectFormContainer from "../containers/NewProjectFormContainer";
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
    projects: [],
    isNewProjectModalOpen: false
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    client.request(query).then(res => {
      this.setState({ projects: res.projects });
    });
  };

  handleToggleNewProjectModal = () => {
    this.setState(state => ({
      isNewProjectModalOpen: !state.isNewProjectModalOpen
    }));
  };

  handleCreateNewProject = () => {
    this.handleToggleNewProjectModal();
    this.fetchData();
  };

  render(props, state) {
    const { isNewProjectModalOpen } = state;
    return (
      <div className="container">
        <h1 className="title">Projects</h1>

        <ProjectsGrid
          projects={this.state.projects}
          renderBefore={() => (
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <button
                    className="button"
                    onClick={this.handleToggleNewProjectModal}
                  >
                    <span className="icon">
                      <i className="fas fa-plus" />
                    </span>
                    <span>Create new project</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          renderItem={project => (
            <ProjectCard project={project} version={project.versions[0]} />
          )}
        />

        <Modal
          isOpen={isNewProjectModalOpen}
          onClose={this.handleToggleNewProjectModal}
        >
          <NewProjectFormContainer onSubmit={this.handleCreateNewProject} />
        </Modal>
      </div>
    );
  }
}
