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

function sendTextMessage(message, targetNumber) {
    return client.messages
    .create({
        body: message,
        from: phoneNumber,
        to: `+1${targetNumber}`
    });
}

function processResponseTextMessage(responseBody) {
    const msgRes = new MessagingResponse();

    if(responseBody.indexOf('confirm')) {
        msgRes.message('Thank you for confirming your subscription');
    }
    if(responseBody.indexOf('unsubscribe')) {
        msgRes.message('Sorry to see you go. Have a good day!');
    }

    // res.writeHead(200, { 'Content-Type': 'text/xml' });
    // res.end(mgsRes.toString());
    return mgsRes.toString();
}


module.exports = {
    processResponseTextMessage,
    sendTextMessage 
}