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
      }
    },
    {}
  );

  Project.associate = function({ Version }) {
    Project.hasMany(Version, { foreignKey: "projectId", sourceKey: "id" });
  };

  return Project;
};
