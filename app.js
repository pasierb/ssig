const express = require("express");
const graphqlHTTP = require("express-graphql");
const graph = require("./graph");
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graph.schema,
    rootValue: graph.root,
    graphiql: true
  })
);

app.listen(3000);
