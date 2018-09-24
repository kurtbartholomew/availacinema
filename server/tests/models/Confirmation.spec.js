const chai = require('chai');
const assert = chai.assert;
const Confirmation = require('../../models/Confirmation');
const User = require('../../models/User');
const dbUtils = require('../../scripts/dbUtils');

describe('Confirmation Data Model', () => {
    afterEach( async ()=> {
        await dbUtils.clearTables(Confirmation.TABLE, User.TABLE);
    });

    describe('add', () => {
        it('should create confirmation', async () => {
            const newUser = await User.add(undefined,undefined,{
                value: "5555555555",
                daily: true,
                weekly: false
            });
            const results = await Confirmation.add(
                Confirmation.TYPE.PHONE,
                newUser[0]
            );
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });

    describe('findByUserId', () => {
        it('should return a confirmation by its id', async () => {
            const newUser = await User.add(undefined,undefined,{
                value: "5555555555",
                daily: true,
                weekly: false
            }, undefined);
            await Confirmation.add(
                Confirmation.TYPE.PHONE,
                newUser[0]
            );
            const results = await Confirmation.findByUserId(newUser[0]);
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });

    describe('findByGuid', () => {
        it('should return a confirmation by its guid', async () => {
            const newUser = await User.add(undefined,undefined,{
                value: "5555555555",
                daily: true,
                weekly: false
            }, undefined);
            const newConfirmation = await Confirmation.add(
                Confirmation.TYPE.PHONE,
                newUser[0]
            );
            const results = await Confirmation.findByGuid(newConfirmation[0]);
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });
});