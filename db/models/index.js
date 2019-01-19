const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../../config/database.json")[env];

const { database, username, password, ...restConfig } = config;
const sequelize = new Sequelize(database, username, password, restConfig);

const db = ['project'].reduce((acc, file) => {
  const model = sequelize.import(path.join(__dirname, file));
  acc[model.name] = model;

  return acc;
}, {});

module.exports = db;
