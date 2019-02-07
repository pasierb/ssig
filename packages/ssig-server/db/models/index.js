"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../../config/database.js")[env];

const { database, username, password, ...restConfig } = config;
const sequelize = new Sequelize(database, username, password, restConfig);

const db = ["project", "version", "layer", "user"].reduce((acc, file) => {
  const model = sequelize.import(path.join(__dirname, file));
  acc[model.name] = model;

  return acc;
}, {});

Object.keys(db).forEach(modelName => {
  const model = db[modelName];

  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;
