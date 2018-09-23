const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const ConfirmationService = require('../../services/ConfirmationService');
const EmailMessageService = require('../../services/EmailMessageService');
const Confirmation = require('../../models/Confirmation');
const User = require('../../models/User');

const userId = 2;
const validConfirmations = [
    {
        type: Confirmation.TYPE.EMAIL,
        guid: 'ksnfoq2efn0s9idfn01fnsfnds',
        user_id: userId
    },
    {
        type: Confirmation.TYPE.PHONE,
        guid: '2309j2ogsdmn29fjsd0oimnv2',
        user_id: userId
    }
]

describe('Confirmation Service', () => {
    describe('sendConfirmations', () => {
        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should call email service if no outstanding confirmations', async () => {
            const sendConfirmationEmailFake = sinon.fake.returns(true)
            this.sandbox.replace(Confirmation, 'findByUserId', () => []);
            this.sandbox.replace(EmailMessageService, 'sendConfirmationEmail', sendConfirmationEmailFake);

            await ConfirmationService.sendConfirmations(userId, undefined, "jim@gmail.com");
            assert.equal(sendConfirmationEmailFake.callCount, 1);
        });

        it('should not call email service if confirmation exists', async () => {
            const sendConfirmationEmailFake = sinon.fake.returns(true)
            this.sandbox.replace(Confirmation, 'findByUserId', () => [validConfirmations[0]]);
            this.sandbox.replace(EmailMessageService, 'sendConfirmationEmail', sendConfirmationEmailFake);

            await ConfirmationService.sendConfirmations(userId, undefined, "jim@gmail.com");
            assert.equal(sendConfirmationEmailFake.callCount, 0);
        });
    });

    describe('confirmValidUserSubscription', () => {
        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should confirm a users phone with valid confirmation guid', async () => {
            const confirmUserPhoneFake = sinon.fake.returns(true);
            this.sandbox.replace(Confirmation, 'findByGuid', () => [validConfirmations[1]]);
            this.sandbox.replace(User, 'confirmUserPhone', confirmUserPhoneFake);
            
            await ConfirmationService.confirmValidUserSubscription(validConfirmations[1].type);
            
            assert.equal(confirmUserPhoneFake.callCount, 1);
        });

        it('should confirm a users email with valid confirmation guid', async () => {
            const confirmUserEmailFake = sinon.fake.returns(true);
            this.sandbox.replace(Confirmation, 'findByGuid', () => [validConfirmations[0]]);
            this.sandbox.replace(User, 'confirmUserEmail', confirmUserEmailFake);
            
            await ConfirmationService.confirmValidUserSubscription(validConfirmations[0].type);
            
            assert.equal(confirmUserEmailFake.callCount, 1);
        });

        it('should throw an error with an invalid guid', async () => {
            this.sandbox.replace(Confirmation, 'findByGuid', () => []);

            let error;
            try {
                await ConfirmationService.confirmValidUserSubscription(validConfirmations[0].type);
            } catch(e) {
                error = e;
            }
            
            assert.isDefined(error);
            assert.match(error.toString(), /does not exist/);
        });
    });
});