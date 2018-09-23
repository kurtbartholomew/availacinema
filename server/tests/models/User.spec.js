const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const db = require('../../db');
const User = require('../../models/User');

describe('User Data Model', () => {
    beforeEach(()=> {
        db(User.TABLE).truncate();
    });

    it('should create a user without needing username and password', async () => {
        await User.add(undefined,undefined,{value:"9204571093",weekly:false,daily:true},undefined);
    });
});