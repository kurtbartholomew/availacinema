const chai = require('chai');
const assert = chai.assert;
const Suggestion = require('../../models/Suggestion');
const User = require('../../models/User');
const dbUtils = require('../../scripts/dbUtils');

describe('Suggestion Data Model', () => {
    afterEach( async ()=> {
        await dbUtils.clearTables(Suggestion.TABLE,User.TABLE);
    });

    describe('add', () => {
        it('should create genre entry for a movie', async () => {
            const newUser = await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            const results = await Suggestion.add(
                "Dracula",
                8.3,
                newUser[0]
            );
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });
    describe('findByUserId', () => {
        it('should return the movie suggestions given to a user', async () => {
            const newUser = await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            await Suggestion.add("Dracula",8.3,newUser[0]);
            const results = await Suggestion.findByUserId(newUser[0]);
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });
});