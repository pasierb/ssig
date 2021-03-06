"use strict";

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      publishedVersionId: {
        type: DataTypes.UUID,
        references: {
          model: "Version",
          key: "id"
        }
      }
    },
    {}
  );

  Project.associate = function({ Version, User }) {
    Project.belongsTo(User, {
      as: "owner",
      foreignKey: "userId",
      sourceKey: "id"
    });

    Project.hasMany(Version, {
      as: "versions",
      foreignKey: "projectId",
      sourceKey: "id"
    });

    Project.belongsTo(Version, {
      as: "publishedVersion",
      foreignKey: "publishedVersionId",
      sourceKey: "id"
    });
  };

  return Project;
};
