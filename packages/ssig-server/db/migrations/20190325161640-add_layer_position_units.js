"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Layers", "xUnit", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("Layers", "yUnit", {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Layers", "xUnit");
    await queryInterface.removeColumn("Layers", "yUnit");
  }
};
