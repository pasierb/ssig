"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Versions", "invocationsCount", {
      type: Sequelize.BIGINT,
      allowNull: false,
      defaultValue: 0
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Versions", "invocationsCount");
  }
};
