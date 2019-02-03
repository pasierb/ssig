"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Versions", "publishedAt", {
      type: Sequelize.DATE
    });

    await queryInterface.addColumn("Projects", "publishedVersionId", {
      type: Sequelize.UUID,
      references: {
        model: "Versions",
        key: "id"
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Versions", "publishedAt");
    await queryInterface.removeColumn("Projects", "publishedVersionId");
  }
};
