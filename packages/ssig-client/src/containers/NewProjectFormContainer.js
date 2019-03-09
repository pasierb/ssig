import { h, Component } from "preact";
import NewProjectForm from "../components/NewProjectForm";
import { connect } from "unistore/preact";
import projectsActions from "../actions/projects";

export default connect(
  "",
  projectsActions
)(
  class NewProjectFormContainer extends Component {
    handleSubmit = ({ name }) => {
      const { createProject } = this.props;
      createProject({ name });
    };

    render() {
      return <NewProjectForm onSubmit={this.handleSubmit} />;
    }
  }
);
