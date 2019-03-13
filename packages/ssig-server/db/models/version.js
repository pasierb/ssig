"use strict";

module.exports = (sequelize, DataTypes) => {
  const Version = sequelize.define(
    "Version",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      projectId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      backgroundColor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "#000"
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1200
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 630
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      publishedAt: DataTypes.DATE,
      invocationsCount: DataTypes.BIGINT
    },
    {}
  );

  Version.associate = function({ Project, Layer }) {
    Version.belongsTo(Project, {
      foreignKey: "projectId",
      targetKey: "id",
      as: "project"
    });

    Version.hasMany(Layer, {
      foreignKey: "versionId",
      sourceKey: "id",
      as: "layers"
    });
  };

  return Version;
};
