const mailer = require('../config/mailer');
const logger = require('../config/logger');

const FROM_LINE = 'admin@availacinema.io';
const SUBJECT  = 'Email Confirmation for AvailaCinema';

module.exports = {
    async sendConfirmationEmail(recipientEmail) {
        mailer.sendMail(FROM_LINE, recipientEmail, SUBJECT, "Hello", (err, info) => {
            if(err) {
                throw new Error(err);
            }
            if(info) {
                logger.debug(info.envelope);
                logger.debug(info.messageId);
            }
            return;
        });
    }
};