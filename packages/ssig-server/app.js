require("dotenv").config();

const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const graphqlHTTP = require("express-graphql");
const graph = require("./graph");
const { api, auth } = require("./routes");
const { twitterAuthenticator } = require("./interactors");
const { User } = require("./db/models");

const app = express();

passport.serializeUser(({ id }, done) => {
  return done(null, id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);

    done(null, user);
  } catch (e) {
    done(e);
  }
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env["TWITTER_TOKEN"],
      consumerSecret: process.env["TWITTER_TOKEN_SECRET"],
      callbackURL: "/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, cb) {
      return twitterAuthenticator(profile)
        .then(user => {
          cb(null, user);
        })
        .catch(cb);
    }
  )
);

app.use(
  expressSession({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/twitter", passport.authenticate("twitter"));
app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

app.post("/auth/signUp", auth.signUp);

app.get(
  "/api/v1/projects/:projectId/versions/:versionId/preview",
  api.v1.projects.versions.preview
);

app.options("/graphql", (req, res) => {
  res.status(200).send("OK");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graph.schema,
    rootValue: graph.root,
    graphiql: true
    // headers: {
    //   "Access-Control-Allow-Origin": "*"
    // }
  })
);

app.listen(3000);
