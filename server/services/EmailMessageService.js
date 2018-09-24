const mailer = require('../config/mailer');
const logger = require('../config/logger');

const FROM_LINE = 'admin@availacinema.io';
const SUBJECT  = 'Email Confirmation for AvailaCinema';

module.exports = {
    async sendConfirmationEmail(recipientEmail) {
        if(recipientEmail === undefined) {
            throw new Error("Recipient email was undefined or not passed");
        }
        await mailer.sendMail(FROM_LINE, recipientEmail, SUBJECT, "Hello");
        return true;
    }
};