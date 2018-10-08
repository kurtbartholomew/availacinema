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

function sendTextMessage(targetNumber, message) {
    return client.messages
    .create({
        body: message,
        from: phoneNumber,
        // TODO: Change if/when international is supported
        to: `+1${targetNumber}`
    });
}

/**
 * 
 * @param {Express request} request 
 * @param {Object - Keys are text to look for, Values are response text messages and functions to fire off in response} textContentsHandlers 
 */
function processResponseTextMessage(request, textContentsHandlers) {
    const msgRes = new MessagingResponse();

    bodyOfText = request.body.Body;
    fromNumber = request.body.From;

    if(bodyOfText !== undefined) {
        for(let targetText in textContentsHandlers) {
            if(bodyOfText.indexOf(targetText) !== -1) {
                const compositeHandler = textContentsHandlers[targetText];
                compositeHandler.handler(fromNumber);
                msgRes.message(compositeHandler.responseText);
                break;
            }
        }
    }

    return {
        responseHeaders: {'Content-Type': 'text/xml'},
        responseBody: msgRes.toString()
    };
}


module.exports = {
    processResponseTextMessage,
    sendTextMessage 
}