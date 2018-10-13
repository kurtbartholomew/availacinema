const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const TextMessageService = require('../../services/TextMessageService');
const ConfirmationService = require('../../services/ConfirmationService');
const textMessageTemplates = require('../config/templates/textMessages');
const textUtil = require('../../config/textSender');
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


describe('Text Message Service', () => {
    describe('sendConfirmationText', () => {
        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should throw an error if not passed an phone number', async () => {
            let error;
            try {
                await TextMessageService.sendConfirmationText();
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
            assert.match(error.toString(),/phone number was undefined/);
        });

        it('should attempt to send an email', async () => {
            const sendTextFake = sinon.fake.returns(true);
            this.sandbox.replace(textUtil, 'sendTextMessage', sendTextFake);
            
            await TextMessageService.sendConfirmationText("5555555555");
            
            assert.equal(sendTextFake.callCount, 1);
        });
    });

    describe('sendSuggestionsText', () => {
        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should throw an error if not passed a phone number', async () => {
            let error;
            try {
                await TextMessageService.sendSuggestionsText();
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
            assert.match(error.toString(),/phone number was undefined/);
        });

        it('should throw an error if suggestions are not included', async () => {
            let error;
            try {
                await TextMessageService.sendSuggestionsText("5555555555");
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
            assert.match(error.toString(),/No suggestions passed/);
        });

        it('should attempt to send an email', async () => {
            const sendTextFake = sinon.fake.returns(true);
            this.sandbox.replace(textUtil, 'sendTextMessage', sendTextFake);
            
            await TextMessageService.sendSuggestionsText("5555555555", validSuggestions, true);
            
            assert.equal(sendTextFake.callCount, 1);
        });
    });

    describe('queueSuggestionsText', () => {
        
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

        it('should queue a suggestions text properly', async () => {
            await TextMessageService.queueSuggestionsText(
                "5555555555",
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
            assert.equal(queue.testMode.jobs[0].type, 'phoneText');
            assert.equal(queue.testMode.jobs[0].data.suggestions[0].title, "Dracula");
        });
    });

    describe('handleUserTextMessage', () => {
        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should throw an error if not passed an email', async () => {
            this.sandbox.replace(textUtil, "extractTextBodyAndPhoneNumber", ()=>{
                return {};
            });

            let error;
            try {
                await TextMessageService.handleUserTextMessage();
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
            assert.match(error.toString(), /No body contained in text/);
        });

        it('should throw an error if not passed an email', async () => {
            this.sandbox.replace(textUtil, "extractTextBodyAndPhoneNumber", ()=>{
                return {
                    textBody: "Hello"
                };
            });

            let error;
            try {
                await TextMessageService.handleUserTextMessage();
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
            assert.match(error.toString(), /No phone number contained in text/);
        });

        it('should confirm user and send verified text if contains CONFIRM', async () => {
            this.sandbox.replace(textUtil, "extractTextBodyAndPhoneNumber", ()=>{
                return {
                    textBody: "heck yah CONFIRM woo",
                    phoneNumber: "5555555555"
                };
            });
            const confirmUserFake = sinon.fake.returns(true);
            this.sandbox.replace(ConfirmationService, 'confirmUserByPhoneNumber', confirmUserFake);
            const verificationTemplateFake = sinon.fake.returns(true);
            this.sandbox.replace(textMessageTemplates, 'createVerificationTemplate', verificationTemplateFake);
            const processResponseTextMessageFake = sinon.fake.returns(true);
            this.sandbox.replace(textUtil, 'processResponseTextMessage', processResponseTextMessageFake);
            
            await TextMessageService.sendSuggestionsText();
            
            assert.equal(confirmUserFake.callCount, 1);
            assert.equal(verificationTemplateFake.callCount, 1);
            assert.equal(processResponseTextMessageFake.callCount, 1);
        });

        it('should unsubscribe user and send unsubscribed text if contains UNSUBSCRIBE', async () => {
            this.sandbox.replace(textUtil, "extractTextBodyAndPhoneNumber", ()=>{
                return {
                    textBody: "annoying and sucks UNSUBSCRIBE",
                    phoneNumber: "5555555555"
                };
            });
            const unsubscribeUserFake = sinon.fake.returns(true);
            this.sandbox.replace(ConfirmationService, 'unsubscribeUserByPhoneNumber', unsubscribeUserFake);
            const unsubscribeTemplateFake = sinon.fake.returns(true);
            this.sandbox.replace(textMessageTemplates, 'createUnsubscribeTemplate', unsubscribeTemplateFake);
            const processResponseTextMessageFake = sinon.fake.returns(true);
            this.sandbox.replace(textUtil, 'processResponseTextMessage', processResponseTextMessageFake);
            
            await TextMessageService.sendSuggestionsText();
            
            assert.equal(unsubscribeUserFake.callCount, 1);
            assert.equal(unsubscribeTemplateFake.callCount, 1);
            assert.equal(processResponseTextMessageFake.callCount, 1);
        });

        it('should not create any response headers or body if no keywords contained', async () => {
            this.sandbox.replace(textUtil, "extractTextBodyAndPhoneNumber", ()=>{
                return {
                    textBody: "bleep bloop a doop",
                    phoneNumber: "5555555555"
                };
            });
            const processResponseTextMessageFake = sinon.fake.returns(true);
            this.sandbox.replace(textUtil, 'processResponseTextMessage', processResponseTextMessageFake);
            
            await TextMessageService.sendSuggestionsText();
            assert.equal(processResponseTextMessageFake.callCount, 0);
        });
    });
});