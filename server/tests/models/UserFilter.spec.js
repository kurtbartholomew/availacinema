const chai = require('chai');
const assert = chai.assert;
const UserFilter = require('../../models/UserFilter');
const User = require('../../models/User');
const dbUtils = require('../../scripts/dbUtils');

describe('UserFilter Data Model', () => {
    afterEach( async ()=> {
        await dbUtils.clearTables(UserFilter.TABLE, User.TABLE);
    });

    describe('add', () => {
        it('should create a filter for a user', async () => {
            const newUser = await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            const results = await UserFilter.add(
                UserFilter.TYPE.RATING,
                "8.3",
                newUser[0]
            );
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });

    describe('addAll', () => {
        it('should create a number of filters for the user', async () => {
            const newUser = await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined); 
            const filters = [
                {
                    type: UserFilter.TYPE.RATING,
                    value: "8.3",
                    user_id: newUser[0]
                },
                {
                    type: UserFilter.TYPE.GENRE,
                    value: "7325",
                    user_id: newUser[0]
                }
            ];
            const filterIds = await UserFilter.addAll(filters);
            assert.isArray(filterIds);
            assert.equal(filterIds.length,2);
        });
    })

    describe('findByUserId', () => {
        it('should create genre entry for a movie', async () => {
            const newUser = await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            await UserFilter.add(
                UserFilter.TYPE.RATING,
                "8.3",
                newUser[0]
            );
            const results = await UserFilter.findByUserId(newUser[0]);
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });
});