"use strict";

const { buildSchema } = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const projects = require("./projects");
const versions = require("./versions");
const layers = require("./layers");
const me = require("./me");

const graph = [me, projects, versions, layers].reduce(
  (acc, { typeSchema, querySchema, queries, mutationSchema, mutations }) => {
    if (typeSchema) {
      acc.schema += typeSchema;
    }

    if (querySchema && queries) {
      acc.rootQuery += querySchema;
      acc.root = Object.assign({}, acc.root, queries);
    }

    if (mutationSchema && mutations) {
      acc.rootMutation += mutationSchema;
      acc.root = Object.assign({}, acc.root, mutations);
    }

    return acc;
  },
  { schema: "", rootQuery: "", root: {}, rootMutation: "", mutation: {} }
);

module.exports = {
  schema: buildSchema(`
    scalar JSON

    ${graph.schema}

    type Query {
      ${graph.rootQuery}
    }

    type Mutation {
      ${graph.rootMutation}
    }
  `),
  root: Object.assign({ JSON: GraphQLJSON }, graph.root)
};
