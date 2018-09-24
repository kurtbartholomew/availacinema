const mailer = require('../config/mailer');
const logger = require('../config/logger');

const FROM_LINE = 'admin@availacinema.io';
const SUBJECT  = 'Email Confirmation for AvailaCinema';

module.exports = {
    async sendConfirmationEmail(recipientEmail) {
        if(recipientEmail === undefined) {
            throw new Error("Recipient email was undefined or not passed");
        }
        try {
            response = await mailer.sendMail(FROM_LINE, recipientEmail, SUBJECT, "Hello");
            if(process.env.NODE_ENV === 'test'){
                logger.info(mailer.mailDaemon.getTestMessageUrl(response));
            }
        } catch (e) {
            logger.error(e);
        }
        return true;
    }
};