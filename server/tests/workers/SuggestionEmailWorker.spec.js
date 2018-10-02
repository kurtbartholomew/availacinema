const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

const User = require('../../models/User');
const SuggestionEmailWorker = require('../../workers/SuggestionEmailWorker');

const validUsers = [
    {
        user_id: 2,
        email: "someone@gmail.com",
        is_email_confirmed: true,
        email_daily: true,
        email_weekly: false
    },
    {
        user_id: 3,
        email: "someperson@gmail.com",
        is_email_confirmed: true,
        email_daily: false,
        email_weekly: true
    },
    {
        user_id: 4,
        email: "somebody@gmail.com",
        is_email_confirmed: true,
        email_daily: true,
        email_weekly: true

    },
    {
        user_id: 5,
        email: "something@gmail.com",
        is_email_confirmed: true,
        email_daily: false,
        email_weekly: true
    }
];



describe('Suggestion Email Worker', () => {
    describe('queueDailyEmailsForUsers', () => {

        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should queue jobs for users that selected the daily option', async () => {
            const queueEmailsForUsersFake = sinon.fake.returns(true);
            this.sandbox.replace(SuggestionEmailWorker.utils, 'queueEmailsForUsers', queueEmailsForUsersFake);
            this.sandbox.replace(User, 'findUsersWithConfirmedEmail', ()=>{
                return validUsers;
            });
            await SuggestionEmailWorker.queueDailyEmailsForUsers();

            assert.equal(queueEmailsForUsersFake.callCount, 1);
            assert.equal(queueEmailsForUsersFake.lastCall.args[0].length, 2);
        });
    });

    describe('queueWeeklyEmailsForUsers', () => {

        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should queue jobs for users that selected the weekly option', async () => {
            const queueEmailsForUsersFake = sinon.fake.returns(true);
            this.sandbox.replace(SuggestionEmailWorker.utils, 'queueEmailsForUsers', queueEmailsForUsersFake);
            this.sandbox.replace(User, 'findUsersWithConfirmedEmail', ()=>{
                return validUsers;
            });
            await SuggestionEmailWorker.queueWeeklyEmailsForUsers();

            assert.equal(queueEmailsForUsersFake.callCount, 1);
            assert.equal(queueEmailsForUsersFake.lastCall.args[0].length, 3);
        });
    });
});