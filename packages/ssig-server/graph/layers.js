"use strict";

const fetch = require("node-fetch");
const models = require("../db/models");
const { versionResolver } = require("./versions");
const {
  promoteLayer: promoteLayerInteractor,
  demoteLayer: demoteLayerInteractor
} = require("../interactors");

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
    code: String
    x: Int
    y: Int
    typeData: JSON
  }

  type Layer {
    id: String!
    type: String!
    name: String!
    code: String!
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
    const maxZ = await models.Layer.max("z", { where: { versionId } });
    const layer = await version.createLayer({
      code: layerInput.name
        .trim()
        .toLowerCase()
        .replace(/\W+/g, "_"),
      ...layerInput,
      z: (maxZ || 0) + 1
    });

    return layerResolver(layer);
  },
  async updateLayer({ id, layerInput }) {
    const layer = await models.Layer.findByPk(id);
    const updateData = { ...layerInput };

    if (layer.type === "image") {
      try {
        const { buffer, contentType } = await fetch(
          layer.typeData.imageUri
        ).then(async res => {
          const buffer = await res.buffer();

          return {
            contentType: res.headers.get("content-type"),
            buffer
          };
        });

        updateData.typeData.imageData = `data:${contentType};base64, ${buffer.toString(
          "base64"
        )}`;
      } catch (e) {
        console.log(e);
        updateData.typeData.imageData = undefined;
      }
    }

    await layer.update(updateData);

    return layerResolver(layer);
  },
  promoteLayer({ id }) {
    return promoteLayerInteractor(id).then(layers => layers.map(layerResolver));
  },
  demoteLayer({ id }) {
    return demoteLayerInteractor(id).then(layers => layers.map(layerResolver));
  }
};

module.exports = {
  typeSchema,
  mutationSchema,
  mutations,
  layerResolver
};
