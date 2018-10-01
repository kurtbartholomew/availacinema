const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const EmailMessageService = require('../../services/EmailMessageService');
const mailer = require('../../config/mailer');
const kue = require('kue');

const validSuggestions = [
    {
        title: "Dracula",
        rating: 9.3
    },
    {
        title: "Honey, I Shrunk the Kids",
        rating: 5.7
    }
];


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

        it('should properly render confirmation email from template', async () => {
            const sendMailFake = sinon.fake.returns(true);
            this.sandbox.replace(mailer, 'sendMail', sendMailFake); 
            
            await EmailMessageService.sendConfirmationEmail("someone@gmail.com","09iwn209ngsfi0adnfg09e23");
            
            assert.match(sendMailFake.lastCall.lastArg, /Thanks for subscribing/);
        });
    });

    describe('sendSuggestionsEmail', () => {
        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should throw an error if not passed an email', async () => {
            let error;
            try {
                await EmailMessageService.sendSuggestionsEmail();
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
            assert.match(error.toString(),/email was undefined/);
        });

        it('should attempt to send an email', async () => {
            const sendMailFake = sinon.fake.returns(true);
            this.sandbox.replace(mailer, 'sendMail', sendMailFake);
            
            await EmailMessageService.sendSuggestionsEmail("someone@gmail.com", validSuggestions, true);
            
            assert.equal(sendMailFake.callCount, 1);
        });

        it('should throw an error if no suggestions are provided', async () => {
            this.sandbox.replace(mailer, 'sendMail', () => true);
            let error;
            try {
                await EmailMessageService.sendSuggestionsEmail("someone@gmail.com", undefined, true);
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
            assert.match(error, /No suggestions passed/);
        });

        it('should properly render confirmation email from template', async () => {
            const sendMailFake = sinon.fake.returns(true);
            this.sandbox.replace(mailer, 'sendMail', sendMailFake); 
            
            await EmailMessageService.sendSuggestionsEmail("someone@gmail.com", validSuggestions, false);

            assert.match(sendMailFake.lastCall.lastArg, /Here are the suggestions of movies/);
        });
    });

    describe('queueSuggestionsEmail', () => {
        
        let queue;

        before(function() {
            queue = kue.createQueue();
            queue.testMode.enter();
        });

        afterEach(function() {
            queue.testMode.clear();
        });

        after(function() {
            queue.testMode.exit();
            queue.shutdown(1,()=>{});
        });

        it('should queue a suggestions email properly', async () => {
            await EmailMessageService.queueSuggestionsEmail(
                "someone@gmail.com",
                [
                    {
                        title: "Dracula",
                        rating: 8.3,
                        userId: 832,
                        movieId: 94031
                    },
                    {
                        title: "Honey I Shrunk The Kids",
                        rating: 6.7,
                        userId: 832,
                        movieId: 8343
                    }
                ],
                true,
                queue
            );
            assert.equal(queue.testMode.jobs.length, 1);
            assert.equal(queue.testMode.jobs[0].type, 'email');
            assert.equal(queue.testMode.jobs[0].data.suggestions[0].title, "Dracula");
        });

        
    });
});