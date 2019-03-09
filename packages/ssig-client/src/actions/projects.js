import graph from "../graph";

export default function projects(store) {
  return {
    async createProject(state, { name }) {
      const { createProject } = await graph.request(
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
      );

      return {
        projects: [createProject, ...state.projects]
      };
    },
    async fetchProjects() {
      const { projects } = await graph.request(
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
      );

      return {
        projects
      };
    }
  };
}
