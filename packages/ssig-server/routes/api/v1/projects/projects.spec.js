const request = require('supertest');
const { User } = require('../../../../db/models');

async function setUpProject() {
    const user = await User.create({ username: 'asd' });
    const project = await user.createProject({ name: 'test' });
    const version = await project.createVersion();

    return { user, project, version };
}

describe('/api/v1/projects', function() {
    describe('GET /:id', function() {
        it('should return 200 for published project', function(done) {
            setUpProject().then(async ({ project, version }) => {
                await project.update({ publishedVersionId: version.id })

                request(global.app)
                    .get(`/api/v1/projects/${project.id}`)
                    .expect(200, done);
            });
        });

        it('should return png image', function(done) {
            setUpProject().then(async ({ project, version }) => {
                await project.update({ publishedVersionId: version.id })

                request(global.app)
                    .get(`/api/v1/projects/${project.id}.png`)
                    .expect('Content-Type', 'image/png')
                    .expect(200, done);
            });
        });

        it('should return jpeg image', function(done) {
            setUpProject().then(async ({ project, version }) => {
                await project.update({ publishedVersionId: version.id })

                request(global.app)
                    .get(`/api/v1/projects/${project.id}`)
                    .expect('Content-Type', 'image/jpeg')
                    .expect(200, done);
            });
        });

        it('should return 404 for wrong id', function(done) {
            request(global.app)
                .get('/api/v1/projects/someNoneExistingUuid')
                .expect(404, done);
        });

        it('should return 404 for unpublished project', function(done) {
            setUpProject().then(({ project }) => {
                request(global.app)
                    .get(`/api/v1/projects/${project.id}`)
                    .expect(404, done);
            });
        });
    });

    describe('POST', function() {
        it('shuld create anonymous project', function(done) {
            request(global.app)
                .post('/api/v1/projects')
                .expect(200, done);
        });
    });
});
