import { h, Component } from "preact";
import { Link, route } from "preact-router";

import graph from "../graph";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Page from "../components/Page";
import VersionCard from "../components/VersionCard";
import ProjectForm from "../components/ProjectForm";

import styles from "./ProjectPage.scss";

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

  fetchProjectData = () => {
    const { projectId } = this.props;

    graph
      .request(
        `
        query getProject($id: String!) {
          project(id: $id) {
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
            }
          }
        }
        `,
        { id: projectId }
      )
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
            <ProjectForm
              {...project}
              onSubmit={this.handleUpdateProject}
              onDelete={this.handleDeleteProject}
            />

            <div className="box">
              {project.publishedVersion && (
                <VersionCard
                  {...project.publishedVersion}
                  actions={[
                    <Button
                      component={Link}
                      icon={Icon.Edit}
                      href={`/projects/${
                        project.publishedVersion.projectId
                      }/versions/${project.publishedVersion.id}/edit`}
                    />,
                    <Button
                      icon={Icon.Copy}
                      onClick={this.handleCopyVersion(
                        project.publishedVersion.id
                      )}
                    />
                  ]}
                />
              )}
            </div>
          </section>
          <section className={styles["ProjectPage__versions"]}>
            <h4 className="title is-4">Versions</h4>

            <div className="box">
              {project.versions.map(version => (
                <VersionCard
                  {...version}
                  key={version.id}
                  actions={[
                    <Button
                      component={Link}
                      href={`/projects/${version.projectId}/versions/${
                        version.id
                      }/edit`}
                      icon={Icon.Edit}
                    />,
                    <Button
                      onClick={this.handleCopyVersion(version.id)}
                      icon={Icon.Copy}
                    />,
                    <Button
                      disabled={project.publishedVersionId === version.id}
                      className="is-danger"
                      onClick={this.handleDeleteVersion(version.id)}
                      icon={Icon.Delete}
                    />
                  ]}
                />
              ))}
            </div>
          </section>
        </div>
      </Page>
    );
  }
}
