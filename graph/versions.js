"use strict";

const ModelResolver = require("./ModelResolver");

class VersionResolver extends ModelResolver {
  get width() {
    return this.model.width;
  }

  get height() {
    return this.model.height;
  }

  get backgroundColor() {
    return this.model.backgroundColor;
  }
}

const typeSchema = `
  type Version {
    id: String!
    projectId: String!
    width: Int!
    height: Int!
    backgroundColor: String!
    createdAt: String!
    updatedAt: String!
  }
`;

module.exports = { typeSchema, VersionResolver };
