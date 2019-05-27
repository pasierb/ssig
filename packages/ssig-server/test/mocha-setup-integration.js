process.env.NODE_ENV = "test";

process.env.TWITTER_TOKEN = "dummyTwitterToken";
process.env.TWITTER_TOKEN_SECRET = "dummyTwitterSecret";

const models = require('../db/models');

async function truncate() {

    await models.Project.update({ publishedVersionId: null }, { where: {}, force: true });
    await models.sequelize.query(`DELETE FROM Sessions`);

    const truncateModels = [
        'Layer',
        'Version',
        'Project',
        'User'
    ]
    
    for (let model of truncateModels) {
        await models[model].destroy({ where: {}, force: true });
    }

    return true;
}

beforeEach(async function() {
    await truncate();
});

before(function() {
    global.app = require('../app');
});

after(function() {
    delete global.app;
});
