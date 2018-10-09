const textUtil = require('../config/textSender');

const path = require('path');
const moment = require('moment');

const CONFIRM_KEYWORD = "CONFIRM";
const UNSUSCRIBE_KEYWORD = "UNSUBSCRIBE";

const textMessageTemplates = require('../config/templates/textMessages');

module.exports = {
    async sendConfirmationText(recipientPhoneNumber, confirmationGuid) {
        if(recipientPhoneNumber === undefined) {
            throw new Error("Recipient phone number was undefined or not passed");
        }
        if(confirmationGuid === undefined) {
            throw new Error("Confirmation guid was undefined or not passed");
        }
        const body = textMessageTemplates.createConfirmationTemplate(CONFIRM_KEYWORD, UNSUSCRIBE_KEYWORD);
        await textUtil.sendTextMessage(recipientPhoneNumber, body);
        return true;
    },
    async sendVerificationText(recipientPhoneNumber, confirmationGuid) {
        if(recipientPhoneNumber === undefined) {
            throw new Error("Recipient phone number was undefined or not passed");
        }
        if(confirmationGuid === undefined) {
            throw new Error("Confirmation guid was undefined or not passed");
        }
        const body = textMessageTemplates.createVerificationTemplate(UNSUSCRIBE_KEYWORD);
        await textUtil.sendTextMessage(recipientPhoneNumber, body);
        return true;
    },
    async sendSuggestionsText(recipientPhoneNumber, suggestions, isDaily) {
        if(recipientPhoneNumber === undefined) {
            throw new Error("Recipient phone number was undefined or not passed");
        }
        if(suggestions === undefined || suggestions.length === 0) {
            throw new Error(`No suggestions passed for phone number ${recipientPhoneNumber}`);
        }
        const date = moment().utc().format('LL');
        const body = textMessageTemplates.createSuggestionsTemplate(isDaily, date, suggestions, UNSUSCRIBE_KEYWORD);
        await textUtil.sendTextMessage(recipientPhoneNumber, body)
        return true;
    },
    async queueSuggestionsText(phoneNumber, suggestions, isDaily, queue) {
        queue.create('phoneText', {
            phoneNumber,
            suggestions,
            isDaily
        })
        .attempts(3)
        .backoff({delay: 5000, type:'exponential'})
        .removeOnComplete( true )
        .ttl(30000)
        .save();
    }
};