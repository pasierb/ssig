const { Project } = require("../db/models");
const ModelResolver = require("./ModelResolver");
const { VersionResolver } = require("./versions");

class ProjectResolver extends ModelResolver {
  get name() {
    return this.model.name;
  }

  async versions() {
    const versions = await this.model.getVersions();

    return versions.map(version => new VersionResolver(version));
  }
}

const schema = `
  type Project {
    id: String!
    name: String!
    createdAt: String!
    versions: [Version]
  }
`;

const queries = `
  getProjects: [Project]
  getProject(id: String!): Project
`;

const resolvers = {
  async getProjects() {
    const projects = await Project.findAll();

    return projects.map(project => new ProjectResolver(project));
  },
  async getProject({ id }) {
    const project = await Project.findByPk(id);

    return new ProjectResolver(project);
  }
};

module.exports = { schema, queries, resolvers, ProjectResolver };
