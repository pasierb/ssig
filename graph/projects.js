"use strict";

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

const typeSchema = `
  type Project {
    id: String!
    name: String!
    createdAt: String!
    versions: [Version]
  }
`;

const querySchema = `
  getProjects: [Project]
  getProject(id: String!): Project
`;

const queries = {
  async getProjects() {
    const projects = await Project.findAll();

    return projects.map(project => new ProjectResolver(project));
  },
  async getProject({ id }) {
    const project = await Project.findByPk(id);

    return new ProjectResolver(project);
  }
};

const mutationSchema = `
  createVersion(projectId: String!): Version
`;

const mutations = {
  async createVersion({ projectId }) {
    const project = await Project.findByPk(projectId);
    const version = await project.createVersion();

    return new VersionResolver(version);
  }
};

module.exports = {
  typeSchema,
  querySchema,
  queries,
  mutationSchema,
  mutations,
  ProjectResolver
};
