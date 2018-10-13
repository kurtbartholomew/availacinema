const textUtil = require('../config/textSender');

const path = require('path');
const moment = require('moment');
const ConfirmationService = require('../services/ConfirmationService');

const CONFIRM_KEYWORD = "CONFIRM";
const UNSUSCRIBE_KEYWORD = "UNSUBSCRIBE";

const textMessageTemplates = require('../config/templates/textMessages');

async function sendConfirmationText(recipientPhoneNumber) {
    if(recipientPhoneNumber === undefined) {
        throw new Error("Recipient phone number was undefined or not passed");
    }
    const body = textMessageTemplates.createConfirmationTemplate(CONFIRM_KEYWORD, UNSUSCRIBE_KEYWORD);
    await textUtil.sendTextMessage(recipientPhoneNumber, body);
    return true;
}
async function sendSuggestionsText(recipientPhoneNumber, suggestions, isDaily) {
    if(recipientPhoneNumber === undefined) {
        throw new Error("Recipient phone number was undefined or not passed");
    }
    if(suggestions === undefined || suggestions.length === 0) {
        throw new Error(`No suggestions passed for phone number ${recipientPhoneNumber}`);
    }
    const date = moment().utc().format('LL');
    const textBodies = textMessageTemplates.createSuggestionsTemplate(isDaily, date, suggestions, UNSUSCRIBE_KEYWORD);
    for(let text of textBodies) {
        await textUtil.sendTextMessage(recipientPhoneNumber, text);
    }
    return true;
}
async function queueSuggestionsText(phoneNumber, suggestions, isDaily, queue) {
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

async function handleUserTextMessage(request) {
    const { textBody, phoneNumber } = textUtil.extractTextBodyAndPhoneNumber(request);
    if(textBody === undefined) {
        throw new Error("Unable to process text message: No body contained in text");
    }
    if(phoneNumber === undefined) {
        throw new Error("Unable to process text message: No phone number contained in text");
    }
    if(textBody.indexOf(CONFIRM_KEYWORD) !== -1){
        await ConfirmationService.confirmUserByPhoneNumber(phoneNumber);
        let responseText = textMessageTemplates.createVerificationTemplate(UNSUSCRIBE_KEYWORD); 
        return textUtil.processResponseTextMessage(responseText);
    } else if(textBody.indexOf(UNSUSCRIBE_KEYWORD) !== -1) {
        await ConfirmationService.unsubscribeUserByPhoneNumber(phoneNumber);
        let responseText = textMessageTemplates.createUnsubscribeTemplate(); 
        return textUtil.processResponseTextMessage(responseText);
    } else {
        return false;
    }
}

module.exports = {
    sendConfirmationText,
    sendSuggestionsText,
    queueSuggestionsText,
    handleUserTextMessage
}