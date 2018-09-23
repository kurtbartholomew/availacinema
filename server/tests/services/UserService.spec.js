const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const UserService = require('../../services/UserService');
const User = require('../../models/User');

describe('User Service', () => {
    beforeEach(() => {
        this.sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        this.sandbox.restore();
    });
    
    
    describe('addUser', () => {
        it('should return true', async () => {
            assert.isTrue(true);
            
        });
    });
});