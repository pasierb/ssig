const express = require("express");
const graphqlHTTP = require("express-graphql");
const graph = require("./graph");
const { api } = require("./routes");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

app.options("/graphql", (req, res) => {
  res.status(200).send("OK");
});

// app.get("/api/v1/image/:projectId")
app.get(
  "/api/v1/projects/:projectId/versions/:versionId/preview",
  api.v1.projects.versions.preview
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graph.schema,
    rootValue: graph.root,
    graphiql: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })
);

app.listen(3000);
