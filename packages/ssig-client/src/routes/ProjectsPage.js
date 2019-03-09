import { h, Component } from "preact";
import { connect } from "unistore/preact";
import projectsActions from "../actions/projects";
import Page from "../components/Page";
import ProjectsGrid from "../components/ProjectsGrid";
import ProjectCard from "../components/ProjectCard";
import Modal from "../components/Modal";
import NewProjectFormContainer from "../containers/NewProjectFormContainer";

export default connect(
  "projects",
  projectsActions
)(
  class ProjectsPage extends Component {
    state = {
      isNewProjectModalOpen: false
    };

    componentWillMount() {
      this.props.fetchProjects();
    }

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
        <Page>
          <div className="container">
            <h1 className="title">Projects</h1>

            <ProjectsGrid
              projects={props.projects}
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
        </Page>
      );
    }
  }
);
