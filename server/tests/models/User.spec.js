const chai = require('chai');
const assert = chai.assert;
const db = require('../../db');
const User = require('../../models/User');

describe('User Data Model', () => {
    afterEach( async ()=> {
        await db.raw(`TRUNCATE ${User.TABLE} RESTART IDENTITY CASCADE`);
    });

    describe('add', () => {
        it('should create a user without needing username and password', async () => {
            const results = await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            assert.isDefined(results);
        });

        it('should create a user with username and password', async () => {
            const results = await User.add("jim","fancypantspassword",{value:"5555555555",weekly:false,daily:true},undefined);
            assert.isDefined(results);
        });

        // TODO: Test hashing and salting of passwords when implementing login

        it('should throw an error if a user with same phone or email exists', async () => {
            await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            let error;
            try {
                await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            } catch(e) {
                error = e;
            }
            assert.isDefined(error); 
        });
    });

    describe('all', () => {
        it('should return all users in the database', async () => {
            await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            await User.add(undefined,undefined,{value:"5555555556",weekly:false,daily:true},undefined);
            const results = await User.all();
            assert.isArray(results);
            assert.equal(results.length, 2);
        });
    });

    describe('findById', () => {
        it('should return a user by their id', async () => {
            await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            const results = await User.add(undefined,undefined,{value:"5555555556",weekly:false,daily:true},undefined);
            const result = await User.findById(results[0]);
            assert.isArray(result);
            assert.equal(result.length, 1);
        });
    });

    describe('confirmUserPhone', () => {
        it('should update a user\'s confirmation status for phone', async () => {
            let results = await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            const userId = results[0];
            await User.confirmUserPhone(userId);
            results = await User.findById(userId);
            assert.isTrue(results[0].is_phone_confirmed);
        });
    });

    describe('confirmUserEmail', () => {
        it('should update a user\'s confirmation status for email', async () => {
            let results = await User.add(undefined, undefined, undefined, {value:"jim@gmail.com",weekly:true,daily:false});
            const userId = results[0];
            await User.confirmUserEmail(userId);
            results = await User.findById(userId);
            assert.isTrue(results[0].is_email_confirmed);
        });
    });

    describe('findByPhoneOrEmail', () => {
        it('should retrieve a user by their phone', async () => {
            await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            const results = await User.findByPhoneOrEmail({value:"5555555555"}, undefined);
            assert.isArray(results);
            assert.equal(results.length, 1);
        });

        it('should retrieve a user by their email', async () => {
            await User.add(undefined, undefined, undefined, {value:"jim@gmail.com",weekly:true,daily:false});
            const results = await User.findByPhoneOrEmail(undefined, {value:"jim@gmail.com"});
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });

});