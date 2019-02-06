import { h, Component } from "preact";
import NewProjectForm from "../components/NewProjectForm";
import client from "../graph";

const CREATE_PROJECT_MUTATION = `
  mutation createProject($name: String!) {
    createProject(name: $name) {
      id
    }
  }
`;

export default class NewProjectFormContainer extends Component {
  handleSubmit = ({ name }) => {
    const { onSubmit } = this.props;

    client.request(CREATE_PROJECT_MUTATION, { name }).then(onSubmit);
  };

  render() {
    return <NewProjectForm onSubmit={this.handleSubmit} />;
  }
}
