const mailer = require('../config/mailer');
// const toTemplate = require('email-templates')();

const FROM_LINE = 'admin@availacinema.com';
const SUBJECT  = 'Email Confirmation for AvailaCinema';
// const DOMAIN = 'http://availacinema.com';

module.exports = {
    async sendConfirmationEmail(recipientEmail, confirmationGuid) {
        if(recipientEmail === undefined) {
            throw new Error("Recipient email was undefined or not passed");
        }
        if(confirmationGuid === undefined) {
            throw new Error("Confirmation guid was undefined or not passed");
        }
        const body = 'hello';
        // const body = await toTemplate('../config/templates/confirmation',{
        //     notificationLink: `${DOMAIN}/api/confirm/${confirmationGuid}`
        // });
        await mailer.sendMail(FROM_LINE, recipientEmail, SUBJECT, body);
        return true;
    }
};