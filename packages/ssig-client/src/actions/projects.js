import graph from "../graph";

export default function projects(store) {
  return {
    createProject(state, { name }) {
      return graph
        .request(
          `
          mutation createProject($name: String!) {
            createProject(name: $name) {
              id
              name
              versions(limit: 1) {
                id
              }
            }
          }
        `,
          { name }
        )
        .then(({ createProject }) => ({
          projects: [createProject, ...state.projects]
        }));
    },
    fetchProjects() {
      return graph
        .request(
          `
          query {
            projects {
              id
              name
              versions(limit: 1) {
                id
              }
            }
          }
        `
        )
        .then(({ projects }) => ({
          projects
        }));
    }
  };
}
