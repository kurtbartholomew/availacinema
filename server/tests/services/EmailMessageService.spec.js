const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const EmailMessageService = require('../../services/EmailMessageService');
const mailer = require('../../config/mailer');

describe('Email Message Service', () => {
    describe('sendConfirmationEmail', () => {
        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should throw an error if not passed an email', async () => {
            let error;
            try {
                await EmailMessageService.sendConfirmationEmail();
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
            assert.match(error.toString(),/email was undefined/);
        });

        it('should attempt to send an email', async () => {
            const sendMailFake = sinon.fake.returns(true);
            this.sandbox.replace(mailer, 'sendMail', sendMailFake);
            
            await EmailMessageService.sendConfirmationEmail("someone@gmail.com","09iwn209ngsfi0adnfg09e23");
            
            assert.equal(sendMailFake.callCount, 1);
        });

        it('should throw an error if no confirmation guid is provided', async () => {
            this.sandbox.replace(mailer, 'sendMail', () => true);
            let error;
            try {
                await EmailMessageService.sendConfirmationEmail("someone@gmail.com");
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
            assert.match(error, /guid was undefined or not passed/);
        });
    });
});