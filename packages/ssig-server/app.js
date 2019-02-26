require("dotenv").config();

const path = require("path");
const express = require("express");
const Sentry = require("@sentry/node");
const expressSession = require("express-session");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const graphqlHTTP = require("express-graphql");
const SequelizeStore = require("connect-session-sequelize")(
  expressSession.Store
);

const graph = require("./graph");
const { api, auth } = require("./routes");
const { twitterAuthenticator } = require("./interactors");
const { User, sequelize } = require("./db/models");

const twitterToken = process.env.TWITTER_TOKEN;
const twitterTokenSecret = process.env.TWITTER_TOKEN_SECRET;
const sentryDsn = process.env.SENTRY_DSN;
const isDev = process.env.NODE_ENV !== "production";

if (!twitterToken || !twitterTokenSecret) {
  throw new Error("Twitter tokens not provided. Check your env");
}

const sessionStore = new SequelizeStore({ db: sequelize });
const app = express();
const port = process.env.SERVER_PORT || 3000;

if (sentryDsn) {
  Sentry.init({ dsn: sentryDsn });
  app.use(Sentry.Handlers.requestHandler());
}

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
      callbackURL: `${
        isDev ? "https://localhost:3001" : ""
      }/api/auth/twitter/callback`,
      proxy: true
    },
    function(token, tokenSecret, profile, cb, ...rest) {
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
    store: sessionStore,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true // if you do SSL outside of node.
  })
);
sessionStore.sync();

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graph.schema,
    rootValue: graph.root,
    graphiql: isDev
  })
);

app.options("/graphql", (req, res) => {
  res.status(200).send("OK");
});

app.get("/api/auth/twitter", passport.authenticate("twitter"));
app.get(
  "/api/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/projects");
  }
);

app.post("/api/auth/signUp", auth.signUp);
app.get("/api/auth/signOut", auth.signOut);

app.get("/api/v1/projects/:projectId", api.v1.projects.project);

app.get(
  "/api/v1/projects/:projectId/versions/:versionId/preview",
  api.v1.projects.versions.preview
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.use(Sentry.Handlers.errorHandler());

app.listen(port, err => {
  if (err) {
    console.error(e);
  }

  console.log(`ssig server running on port ${port}`);
});
