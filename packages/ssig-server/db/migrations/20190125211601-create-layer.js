'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Layers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      versionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Versions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      x: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      y: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      z: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      typeData: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Layers');
  }
};