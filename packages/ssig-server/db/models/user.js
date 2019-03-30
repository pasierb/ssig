"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isAnonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      twitterAccountId: DataTypes.INTEGER
    },
    {}
  );
  User.associate = function({ Project }) {
    User.hasMany(Project, { foreignKey: "userId", sourceKey: "id" });
  };
  return User;
};
