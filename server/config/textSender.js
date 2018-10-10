require('dotenv').config();
const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;

let accountSid;
let authToken;
let phoneNumber;

if(process.env.NODE_ENV === 'production') {
    accountSid = process.env.TWILIO_API_ACCOUNT;
    authToken = process.env.TWILIO_API_KEY;
    phoneNumber = process.env.TWILIO_PHONE_NUMBER;
} else {
    accountSid = process.env.TWILIO_TEST_API_ACCOUNT;
    authToken = process.env.TWILIO_TEST_API_KEY;
    phoneNumber = process.env.TWILIO_TEST_PHONE_NUMBER;
}

const client = twilio(accountSid, authToken);

async function sendTextMessage(targetNumber, message) {
    try {
        await client.messages.create({
            body: message,
            from: phoneNumber,
            // TODO: Change if/when international is supported
            to: `+1${targetNumber}`
        });
        return true;
    } catch (e) {
        logger.error(`Error ocurred while attempting to send a text to ${targetNumber}`);
        logger.error(e.stack);
        return false;
    }
}

/**
 * 
 * @param {Express request} request 
 * @param {Object - Keys are text to look for, Values are response text messages and functions to fire off in response} textContentsHandlers 
 */
function processResponseTextMessage(responseText) {
    const msgRes = new MessagingResponse();
    msgRes.message(responseText);

    return {
        responseHeaders: {'Content-Type': 'text/xml'},
        responseBody: msgRes.toString()
    };
}

function extractTextBodyAndPhoneNumber(request) {
    return {
        textBody: request.body.Body,
        phoneNumber: request.body.From
    };
}


module.exports = {
    processResponseTextMessage,
    sendTextMessage,
    extractTextBodyAndPhoneNumber
}