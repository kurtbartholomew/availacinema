const request = require('supertest');
const chai = require('chai');
const assert = chai.assert;
const dbUtils = require('../../scripts/dbUtils');

const app = require('../../app');

const validFilters = [
    {
        type: 0,
        value: 8.3
    },
    {
        type: 1,
        value: "38"
    },
    {
        type: 1,
        value: "74"
    }
];

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

        beforeEach(async ()=> {
            await dbUtils.clearTables();
        });

        afterEach(async ()=> {
            await dbUtils.clearTables();
        });


        it('should return error and 400 error code if no valid phone or email address', async () => {
            const response = await request(app)
            .post('/api/user')
            .send({})
            .expect(400);
            const body = response.body;
            assert.isDefined(body.errors);
            assert.match(body.errors.toString(), /phone number or email must be provided/);
        });

        it('should return error and 400 status code if no valid filters', async () => {
            const response = await request(app)
            .post('/api/user')
            .send({phone:{value:"3042030434",daily:true,weekly:false}})
            .expect(400);
            const body = response.body;
            assert.isDefined(body.errors);
            assert.match(body.errors.toString(), /Missing valid filters/);
        });

        // Once I can actually seed the db properly during tests, I'll reenable this
        it.skip('should return error and 400 error code if user with same phone or email exists', async () => {
            const response = await request(app)
            .post('/api/user')
            .send({
                phone: {
                    value:"5555555555",
                    daily:true,
                    weekly:false
                },
                filters: validFilters
            })
            .expect(400);
            const body = response.body;
            assert.isDefined(body.error);
            assert.match(body.error.toString(), /User subscription failed/);
        });

        it('should return 200 and trigger confirmation email', async () => {
            const response = await request(app)
            .post('/api/user')
            .send({
                email: {
                    value:"someone@gmail.com",
                    daily:true,
                    weekly:false
                },
                filters: validFilters
            })
            .expect(200);
            const body = response.body;
            assert.isDefined(body.success);
            assert.match(body.success, /User created/);
        }).timeout(4000);
    });
    // TODO: Make clearing and seeding of db for e2e tests more programmatic and less fragile
});