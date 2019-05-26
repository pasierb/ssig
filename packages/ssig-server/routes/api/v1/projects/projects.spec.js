const request = require('supertest');

describe('/api/v1/projects', function() {
    describe('GET /:id', function() {
        it('should return 404 for wrong id', function(done) {
            request(global.app)
                .get('/api/v1/projects/someNoneExistingUuid')
                .expect(404, done);
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
