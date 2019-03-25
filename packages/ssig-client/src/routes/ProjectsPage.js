import { h, Component } from "preact";
import { connect } from "unistore/preact";

import projectsActions from "../actions/projects";
import Page from "../components/Page";
import ProjectCard from "../components/ProjectCard";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Icon from "../components/Icon";
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
      const { projects } = props;
      const { isNewProjectModalOpen } = state;
      const cardColumnClassName =
        "column is-12-mobile is-4-tablet is-3-desktop is-3-widescreen";

      return (
        <Page>
          <h1 className="title">Projects</h1>

          <div className="columns is-multiline">
            <div className={cardColumnClassName}>
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <Button
                      className="is-link"
                      onClick={this.handleToggleNewProjectModal}
                      icon={Icon.Add}
                    >
                      Create new project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {projects.map((project, i) => (
              <div className={cardColumnClassName} key={project.id}>
                <ProjectCard
                  project={project}
                  version={project.versions[0]}
                  style={`--reveal-delay: ${i * 50}ms;`}
                >
                  <p className="title is-4">{project.name}</p>
                </ProjectCard>
              </div>
            ))}
          </div>

          <Modal
            isOpen={isNewProjectModalOpen}
            onClose={this.handleToggleNewProjectModal}
          >
            <NewProjectFormContainer onSubmit={this.handleCreateNewProject} />
          </Modal>
        </Page>
      );
    }
  }
);
