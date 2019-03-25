"use strict";

const fetch = require("node-fetch");
const { Version, Layer } = require("../db/models");
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
    xUnit: String
    yUnit: String
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
    xUnit: String
    yUnit: String
    z: Int!
    typeData: JSON
  }
`;

const mutationSchema = `
  createLayer(versionId: String!, layerInput: LayerInput!): Layer
  updateLayer(id: String!, layerInput: LayerInput!): Layer
  promoteLayer(id: String!): [Layer]
  demoteLayer(id: String!): [Layer]
  deleteLayer(id: String!): Int!
`;

const mutations = {
  async createLayer({ versionId, layerInput }) {
    const version = await Version.findByPk(versionId);
    const maxZ = await Layer.max("z", { where: { versionId } });
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
    const layer = await Layer.findByPk(id, { include: [{ model: Version }] });
    const updateData = { ...layerInput };

    if (layer.Version.publishedAt) {
      throw new Error("Can not update published version");
    }

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
  },
  deleteLayer({ id }) {
    return Layer.destroy({ where: { id } });
  }
};

module.exports = {
  typeSchema,
  mutationSchema,
  mutations,
  layerResolver
};
