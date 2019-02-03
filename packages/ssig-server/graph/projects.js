"use strict";

const { Project, Version } = require("../db/models");
const { versionResolver } = require("./versions");

function projectResolver(model) {
  return Object.assign({}, model.dataValues, {
    async versions({ limit = 10 }, obj) {
      const versions = await model.getVersions({ limit });

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
    publishedVersionId: String
    versions(limit: Int): [Version]
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
  publishProjectVersion(projectId: String!, versionId: String!): Project
`;

const mutations = {
  async createProject({ name }) {
    const project = await Project.create({ name });

    // create first draft version
    await project.createVersion();

    return projectResolver(project);
  },
  async publishProjectVersion({ projectId, versionId }) {
    const project = await Project.findByPk(projectId);
    const version = await Version.findByPk(versionId, {
      where: { projectId }
    });

    await version.update({ publishedAt: new Date() });
    await project.update({ publishedVersionId: version.id });

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
