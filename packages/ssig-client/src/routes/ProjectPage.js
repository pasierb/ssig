import { h, Component } from "preact";
import { route, Link } from "preact-router";

import graph from "../graph";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Page from "../components/Page";
import VersionCard from "../components/VersionCard";
import ProjectForm from "../components/ProjectForm";
import PageSectionTitle from "../components/PageSectionTitle";

import styles from "./ProjectPage.scss";

const PROJECT_FRAGMENT = `
  id
  name
  publishedVersionId
  publishedVersion {
    id
    projectId
    updatedAt
    publishedAt
  }
  versions {
    id
    projectId
    updatedAt
    publishedAt
  }`;

function getProject(id) {
  return graph.request(
    `query getProject($id: String!) {
      project(id: $id) { ${PROJECT_FRAGMENT} }
    }`,
    { id }
  );
}

function updateProject({ id, name }) {
  return graph.request(
    `mutation updateProject($id: String!, $input: ProjectInput!) {
      updateProject(id: $id, input: $input) {
        id
      }
    }`,
    { id, input: { name } }
  );
}

function deleteVersion(id) {
  return graph.request(
    `mutation deleteVersion($id: String!) {
      deleteVersion(id: $id)
    }`,
    { id }
  );
}

function copyVersion(id) {
  return graph.request(
    `mutation copyVersion($id: String!) {
      copyVersion(id: $id) {
        id
      }
    }`,
    { id }
  );
}

function deleteProject(id) {
  return graph.request(
    `mutation deleteProject($id: String!) {
      deleteProject(id: $id)
    }`,
    { id }
  );
}

function unpublishProject(id) {
  return graph.request(
    `mutation unpublishProject($id: String!) {
      unpublishProject(id: $id) { ${PROJECT_FRAGMENT} }
    }`,
    { id }
  );
}

export default class ProjectPage extends Component {
  state = {
    project: undefined,
    error: undefined
  };

  handleUpdateProject = result => {
    updateProject(result).then(this.fetchProjectData);
  };

  handleDeleteProject = id => {
    const { project } = this.state;

    if (
      confirm(
        `Are you sure you want to delete ${
          project.name
        }? All data will be lost.`
      )
    ) {
      deleteProject(id).then(() => {
        route("/projects");
      });
    }
  };

  handleDeleteVersion = versionId => event => {
    event.preventDefault();

    deleteVersion(versionId).then(this.fetchProjectData);
  };

  handleCopyVersion = versionId => event => {
    event.preventDefault();

    copyVersion(versionId).then(this.fetchProjectData);
  };

  handleUnpublishProject = event => {
    event.preventDefault();

    unpublishProject(this.props.projectId).then(({ unpublishProject }) => {
      this.setState({ project: unpublishProject });
    });
  };

  fetchProjectData = () => {
    const { projectId } = this.props;

    getProject(projectId)
      .then(({ project }) => {
        this.setState({ project });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  componentWillMount() {
    this.fetchProjectData();
  }

  render(props, state) {
    const { project, error } = state;

    if (error) {
      return <p>{error}</p>;
    }

    if (!project) {
      return <p>Loading</p>;
    }

    return (
      <Page>
        <div className={`container ${styles.ProjectPage}`}>
          <section className={styles["ProjectPage__header"]}>
            <h1 className="title">{project.name}</h1>
          </section>
          <section className={styles["ProjectPage__published-version"]}>
            <PageSectionTitle>Edit</PageSectionTitle>

            <ProjectForm
              {...project}
              onSubmit={this.handleUpdateProject}
              onDelete={this.handleDeleteProject}
            />

            <div className="box">
              {project.publishedVersion && (
                <VersionCard {...project.publishedVersion}>
                  <VersionCard.DeleteButton
                    onClick={this.handleUnpublishProject}
                  />
                  <VersionCard.Details />
                  <div className="buttons">
                    <Button
                      as={Link}
                      href={`/projects/${
                        project.publishedVersion.projectId
                      }/versions/${project.publishedVersion.id}/edit`}
                      icon={Icon.Edit}
                    />
                    <Button
                      onClick={this.handleCopyVersion(
                        project.publishedVersion.id
                      )}
                      icon={Icon.Copy}
                    />
                  </div>
                </VersionCard>
              )}
            </div>
          </section>
          <section className={styles["ProjectPage__versions"]}>
            <PageSectionTitle>Versions</PageSectionTitle>

            <div className="box">
              {project.versions.map(version => (
                <VersionCard {...version} key={version.id}>
                  <VersionCard.Details />
                  <div className="buttons">
                    <Button
                      as={Link}
                      href={`/projects/${version.projectId}/versions/${
                        version.id
                      }/edit`}
                      icon={Icon.Edit}
                    />
                    <Button
                      onClick={this.handleCopyVersion(version.id)}
                      icon={Icon.Copy}
                    />
                    <Button
                      className="is-danger"
                      onClick={this.handleDeleteVersion(version.id)}
                      icon={Icon.Delete}
                    />
                  </div>
                </VersionCard>
              ))}
            </div>
          </section>
        </div>
      </Page>
    );
  }
}
