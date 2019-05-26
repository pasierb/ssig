process.env.NODE_ENV = "test";

process.env.TWITTER_TOKEN = "dummyTwitterToken";
process.env.TWITTER_TOKEN_SECRET = "dummyTwitterSecret";

function truncate() {
    const models = require('../db/models');

    return Promise.all(Object.keys(models).map((key) => {
        if (['sequelize', 'Sequelize'].includes(key)) return null;

        return models[key].destroy({ where: {}, force: true });
    }))
}

beforeEach(async function() {
    await truncate();

    const app = require('../app');

    global.app = app;
});

afterEach(function() {
    delete global.app;
});
