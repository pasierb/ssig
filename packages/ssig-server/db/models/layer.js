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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      x: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      xUnit: DataTypes.STRING,
      y: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      yUnit: DataTypes.STRING,
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
