"use strict";

module.exports = (sequelize, DataTypes) => {
  const Layer = sequelize.define(
    "Layer",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      x: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      y: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      z: DataTypes.INTEGER,
      type: DataTypes.STRING,
      typeData: {
        type: DataTypes.JSON,
        defaultValue: {}
      }
    },
    {}
  );

  Layer.associate = function({ Version }) {
    Layer.belongsTo(Version, { foreignKey: "versionId", targetKey: "id" });
  };

  return Layer;
};
