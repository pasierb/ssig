"use strict";

const { Layer, Version, Project, sequelize } = require("../db/models");
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
  copyVersion(id: String!): Version
  deleteVersion(id: String!): String
`;

const mutations = {
  async createVersion({ projectId }) {
    const project = await Project.findByPk(projectId);
    const version = await project.createVersion();

    return versionResolver(version);
  },
  async updateVersion({ id, input }) {
    const version = await Version.findByPk(id);
    await version.update(input);

    return versionResolver(version);
  },
  async copyVersion({ id }, req) {
    const version = await Version.findByPk(id, {
      include: [{ association: "layers" }, { association: "project" }]
    });
    const {
      id: versionId,
      publishedAt,
      status,
      invocationsCount,
      updatedAt,
      createdAt,
      ...copyVersionData
    } = version.dataValues;

    if (!req.user || req.user.id !== version.project.userId) {
      throw new Error("Unauthorized");
    }

    return sequelize.transaction(async transaction => {
      const copyVersion = await Version.create(copyVersionData, {
        transaction
      });

      await Promise.all(
        version.layers.map(layer => {
          const {
            id: layerId,
            updatedAt,
            createdAt,
            ...layerData
          } = layer.dataValues;

          return Layer.create(
            { ...layerData, versionId: copyVersion.id },
            { transaction }
          );
        })
      );

      return versionResolver(copyVersion);
    });
  },
  async deleteVersion({ id }, req) {
    const version = await Version.findByPk(id, {
      include: [{ association: "project" }]
    });

    if (!req.user || req.user.id !== version.project.userId) {
      throw new Error("Unauthorized");
    }

    await version.destroy();

    return id;
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
