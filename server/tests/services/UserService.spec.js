const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const UserService = require('../../services/UserService');
const User = require('../../models/User');
const UserFilter = require('../../models/UserFilter');

const filters = [
    {
        type: UserFilter.TYPE.RATING,
        value: "8.3",
        user_id: 1
    },
    {
        type: UserFilter.TYPE.GENRE,
        value: "7325",
        user_id: 1
    }
];

describe('User Service', () => {
    describe('addUser', () => {
        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should add a user given valid inputs', async () => {
            this.sandbox.replace(User, 'findByPhoneOrEmail', () => []);
            this.sandbox.replace(User, 'add', () => [1]);
            this.sandbox.replace(UserFilter,'addAll',() => [1,2]);

            const result = await UserService.addUser(
                undefined,
                undefined,
                {
                    value: "5555555555",
                    daily: true,
                    weekly: false
                },
                undefined,
                filters
            );
            assert.equal(result[0],1);
        });

        it('should fail if user already exists', async () => {
            this.sandbox.replace(User, 'findByPhoneOrEmail', () => [1]);
            this.sandbox.replace(User, 'add', () => [1]);
            this.sandbox.replace(UserFilter,'addAll',() => [1,2]);

            let error;
            try {
                await UserService.addUser(
                    undefined,
                    undefined,
                    {
                        value: "5555555555",
                        daily: true,
                        weekly: false
                    },
                    undefined,
                    filters
                );
            } catch(e) {
                error = e;
            }
            
            assert.isDefined(error);
            assert.match(error.toString(), /already exists/);
        });

        it('should fail if no rating filter', async () => {
            this.sandbox.replace(User, 'findByPhoneOrEmail', () => []);
            this.sandbox.replace(User, 'add', () => [1]);
            this.sandbox.replace(UserFilter,'addAll',() => [1,2]);

            missingfilters = [filters[1]];

            let error;
            try {
                await UserService.addUser(
                    undefined,
                    undefined,
                    {
                        value: "5555555555",
                        daily: true,
                        weekly: false
                    },
                    undefined,
                    missingfilters
                );
            } catch(e) {
                error = e;
            }
            assert.isDefined(error)
            assert.match(error.toString(), /no rating filter/);
        });

        it('should fail if no rating filter', async () => {
            this.sandbox.replace(User, 'findByPhoneOrEmail', () => []);
            this.sandbox.replace(User, 'add', () => [1]);
            this.sandbox.replace(UserFilter,'addAll',() => [1,2]);

            missingfilters = [filters[0]];

            let error;
            try {
                await UserService.addUser(
                    undefined,
                    undefined,
                    {
                        value: "5555555555",
                        daily: true,
                        weekly: false
                    },
                    undefined,
                    missingfilters
                );
            } catch(e) {
                error = e;
            }
            assert.isDefined(error)
            assert.match(error.toString(), /no genre filter/);
        });
    });
});