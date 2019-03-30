require("dotenv").config();

const path = require("path");
const express = require("express");
const Sentry = require("@sentry/node");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const CustomStrategy = require("passport-custom");
const graphqlHTTP = require("express-graphql");
const SequelizeStore = require("connect-session-sequelize")(
  expressSession.Store
);

const graph = require("./graph");
const { api, auth } = require("./routes");
const { twitterAuthenticator } = require("./interactors");
const { User, Project, sequelize } = require("./db/models");

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
const secret = process.env.SERVER_SECRET || Date.now() + "";

sessionStore.sync();

async function transferAnonymousProjects(req, res, next) {
  const anonymousUserId = req.signedCookies["ssig.aUid"];

  if (anonymousUserId) {
    await Project.update(
      { userId: req.user.id },
      { where: { userId: anonymousUserId } }
    );
    await User.destroy({ where: { id: anonymousUserId } });

    res.clearCookie("ssig.aUid");
  }

  next();
}

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
    function(token, tokenSecret, profile, cb) {
      return twitterAuthenticator(profile)
        .then(user => {
          cb(null, user);
        })
        .catch(cb);
    }
  )
);

passport.use(
  "ensureAccount",
  new CustomStrategy(function(req, done) {
    if (req.user) {
      return done(null, req.user);
    }

    return User.create({
      isAnonymous: true,
      username: `anonymous_${Date.now()}`
    })
      .then(user => done(null, user))
      .catch(done);
  })
);

app.use(
  expressSession({
    secret,
    store: sessionStore,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true // if you do SSL outside of node.
  })
);
app.use(cookieParser(secret));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  const anonymousUserId = req.signedCookies["ssig.aUid"];

  if (!anonymousUserId && req.user && req.user.isAnonymous) {
    res.cookie("ssig.aUid", req.user.id, {
      httpOnly: true,
      signed: true
    });
  }

  next();
});
app.use(function(req, res, done) {
  const anonymousUserId = req.signedCookies["ssig.aUid"];

  if (req.user || !anonymousUserId) {
    return done();
  }

  User.findByPk(anonymousUserId)
    .then(user => {
      req.login(user, () => done());
    })
    .catch(e => done());
});
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
  transferAnonymousProjects,
  function(req, res) {
    res.redirect("/projects");
  }
);
app.get("/api/auth/signOut", auth.signOut);

app.get("/api/v1/projects/:projectId", api.v1.projects.getProject);
app.post(
  "/api/v1/projects",
  passport.authenticate("ensureAccount", { failureRedirect: "/" }),
  api.v1.projects.createProject
);
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
