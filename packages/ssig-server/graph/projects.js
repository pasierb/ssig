"use strict";

const { Project } = require("../db/models");
const { versionResolver } = require("./versions");

function projectResolver(model) {
  return Object.assign({}, model.dataValues, {
    async versions(args, obj) {
      const versions = await model.getVersions({ where: args });

      return versions.map(versionResolver);
    },
    async version({ id }, obj) {
      const versions = await model.getVersions({ where: { id }, limit: 1 });

      return versionResolver(versions[0]);
    }
  });
}

const typeSchema = `
  type Project {
    id: String!
    name: String!
    createdAt: String!
    versions: [Version]
    version(id: String!): Version
  }
`;

const querySchema = `
  projects: [Project]
  project(id: String!): Project
`;

const queries = {
  async projects() {
    const projects = await Project.findAll();

    return projects.map(projectResolver);
  },
  async project({ id }) {
    const project = await Project.findByPk(id);

    return projectResolver(project);
  }
};

const mutationSchema = `
  createProject(name: String!): Project
`;

const mutations = {
  async createProject({ name }) {
    const project = await Project.create({ name });

    // create first draft version
    await project.createVersion();

    return projectResolver(project);
  }
};

module.exports = {
  typeSchema,
  querySchema,
  queries,
  mutationSchema,
  mutations,
  projectResolver
};
