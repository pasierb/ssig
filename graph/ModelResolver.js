"use strict";

class ModelResolver {
  constructor(modelInstance) {
    this.model = modelInstance;
  }

  get id() {
    return this.model.id;
  }

  get createdAt() {
    return this.model.createdAt;
  }

  get updatedAt() {
    return this.model.updatedAt;
  }
}

module.exports = ModelResolver;
