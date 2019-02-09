"use strict";

const { Layer, Version, Project } = require("../db/models");
const { layerResolver } = require("./layers");

function versionResolver(model) {
  return Object.assign({}, model.dataValues, {
    layers() {
      return Layer.findAll({
        where: { versionId: model.id },
        order: [["z", "ASC"]]
      }).then(layers => layers.map(layerResolver));
    }
  });
}

const typeSchema = `
  type Version {
    id: String!
    projectId: String!
    layers: [Layer]
    status: Int!
    width: Int!
    height: Int!
    backgroundColor: String!
    publishedAt: String
    createdAt: String!
    updatedAt: String!
  }

  input VersionInput {
    width: Int
    height: Int
    backgroundColor: String
  }
`;

const querySchema = `
  version(id: String!): Version
`;

const queries = {
  async version({ id }) {
    const version = await Version.findByPk(id);

    return versionResolver(version);
  }
};

const mutationSchema = `
  createVersion(projectId: String!): Version
  updateVersion(id: String!, input: VersionInput!): Version
`;

const mutations = {
  async createVersion({ projectId }) {
    const project = await Project.findByPk(projectId);
    const version = await project.createVersion();

    return versionResolver(version);
  },
  async updateVersion({ id, input }) {
    const version = await models.Version.findByPk(id);
    await version.update(input);

    return versionResolver(version);
  }
};

module.exports = {
  typeSchema,
  versionResolver,
  querySchema,
  queries,
  mutationSchema,
  mutations
};
