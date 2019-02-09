"use strict";

const { Layer, sequelize } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("Layers", "code", { type: Sequelize.STRING })
      .then(() => {
        return Layer.findAll();
      })
      .then(layers => {
        return Promise.all(
          layers.map(layer => {
            layer.update({
              code: layer.name.toLowerCase().replace(/\W+/, "_")
            });
          })
        );
      })
      .then(() => {
        return queryInterface.addIndex("Layers", {
          fields: ["code", "versionId"],
          unique: true
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Layers", "code");
  }
};
