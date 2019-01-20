"use strict";

const { buildSchema } = require("graphql");
const projects = require("./projects");
const versions = require("./versions");

const graph = [projects, versions].reduce(
  (acc, { schema, queries, resolvers }) => {
    acc.schema += schema;

    if (queries) {
      acc.query += queries;
    }

    if (resolvers) {
      acc.root = Object.assign({}, acc.root, resolvers);
    }

    return acc;
  },
  { schema: "", query: "", root: {} }
);

module.exports = {
  schema: buildSchema(`
    ${graph.schema}

    type Query {
      ${graph.query}
    }
  `),
  root: graph.root
};
