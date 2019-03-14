"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint("Projects", "Projects_publishedVersionId_foreign_idx"),
      queryInterface.addConstraint("Projects", ["publishedVersionId"], {
        type: "foreign key",
        name: "Projects_published_version_fk",
        references: {
          table: "Versions",
          field: "id"
        },
        onUpdate: "cascade",
        onDelete: "restrict"
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
