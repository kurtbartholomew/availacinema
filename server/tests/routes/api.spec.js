const request = require('supertest');
const chai = require('chai');
const assert = chai.assert;

const app = require('../../app');

describe('API endpoints', () => {

    describe.skip('GET /genres', () => {
        it('should respond with json and status code 200', async () => {
            await request(app)
            .get('/api/genres')
            .expect('Content-Type', /json/)
            .expect(200);
        });

        it('should respond with a list of genres', async () => {
            const response = await request(app).get('/api/genres');
            const genres = response.body;
            assert.isArray(genres);
            assert.isTrue(genres.length > 0);
        });
    });

    describe('POST /user', () => {
        it('should return error and 400 error code if no valid phone or email address', async () => {
            const response = await request(app)
            .post('/api/user')
            .send({})
            .expect(400);
            const body = response.body;
            assert.isDefined(body.error);
            assert.match(body.error, /Missing either a valid phone/);
        });

        it('should return error and 400 error code if no valid phone or email address', async () => {
            const response = await request(app)
            .post('/api/user')
            .send({phone:{value:"3042030434",daily:true,weekly:false}})
            .expect(400);
            const body = response.body;
            assert.isDefined(body.error);
            assert.match(body.error, /Missing valid filters/);
        });

        it('should return error and 400 error code if user with same phone or email exists', async () => {
            const response = await request(app)
            .post('/api/user')
            .send({phone:{value:"3042030434",daily:true,weekly:false}})
            .expect(400);
            const body = response.body;
            assert.isDefined(body.error);
            assert.match(body.error, /Missing valid filters/);
        });
    });
    
});