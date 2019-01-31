"use strict";

const models = require("../db/models");
const { versionResolver } = require("./versions");

function layerResolver(model) {
  return Object.assign({}, model.dataValues, {
    async version() {
      const version = await model.getVersion();

      return versionResolver(version);
    }
  });
}

const typeSchema = `
  input LayerInput {
    type: String
    name: String
    x: Int
    y: Int
    typeData: JSON
  }

  type Layer {
    id: String!
    type: String!
    name: String!
    versionId: String!
    version: Version!
    x: Int!
    y: Int!
    z: Int!
    typeData: JSON
  }
`;

const mutationSchema = `
  createLayer(versionId: String!, layerInput: LayerInput!): Layer
  updateLayer(id: String!, layerInput: LayerInput!): Layer
  promoteLayer(id: String!): [Layer]
  demoteLayer(id: String!): [Layer]
  deleteLayer(id: String!): String
`;

const mutations = {
  async createLayer({ versionId, layerInput }) {
    const version = await models.Version.findByPk(versionId);
    const maxZ = await models.Layer.max('z', { where: { versionId } })
    const layer = await version.createLayer({ ...layerInput, z: (maxZ || 0) + 1 });

    return layerResolver(layer);
  },
  async updateLayer({ id, layerInput }) {
    const layer = await models.Layer.findByPk(id);
    await layer.update(layerInput);

    return layerResolver(layer);
  },
  async promoteLayer({ id }) {
    const layer = await models.Layer.findByPk(id);
    // models.Layer.find({ where: { versionId: layer.versionId, z: { '>': layer.z }, order: '' }})

    return layerResolver(layer);
  },
  async demoteLayer({ id }) {
    const layer = await models.Layer.findByPk(id);

    return layerResolver(layer);
  }
};

module.exports = {
  typeSchema,
  mutationSchema,
  mutations,
  layerResolver
};
