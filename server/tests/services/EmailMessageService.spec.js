const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const EmailMessageService = require('../../services/EmailMessageService');

describe('Email Message Service', () => {
    describe.skip('sendConfirmationEmail', () => {
        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should add a user given valid inputs', async () => {
            
        });

    });
});