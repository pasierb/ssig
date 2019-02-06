// const { User } = require('../db/models')

function userResolver(user) {
  return user;
}

const typeSchema = `
  type User {
    id: String!
    username: String!
  }
`;

const querySchema = `
  me: User
`;

const queries = {
  me(arg, req) {
    return userResolver(req.user);
  }
};

module.exports = {
  typeSchema,
  querySchema,
  queries
};
