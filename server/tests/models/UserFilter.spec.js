const chai = require('chai');
const assert = chai.assert;
const db = require('../../db');
const UserFilter = require('../../models/UserFilter');
const User = require('../../models/User');

describe('UserFilter Data Model', () => {
    afterEach( async ()=> {
        await db.raw(`TRUNCATE ${UserFilter.TABLE} RESTART IDENTITY CASCADE`);
        await db.raw(`TRUNCATE ${User.TABLE} RESTART IDENTITY CASCADE`); 
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