const mailer = require('../config/mailer');
const logger = require('../config/logger');

const FROM_LINE = 'admin@availacinema.io';
const SUBJECT  = 'Email Confirmation for AvailaCinema';

module.exports = {
    async sendConfirmationEmail(recipientEmail) {
        if(recipientEmail === undefined) {
            throw new Error("Recipient email was undefined or not passed");
        }
        mailer.sendMail(FROM_LINE, recipientEmail, SUBJECT, "Hello", (err, info) => {
            if(err) {
                logger.error(err);
                throw new Error(err);
            }
            if(info) {
                logger.debug(info.envelope);
                logger.debug(info.messageId);
            }
            if(process.env.NODE_ENV === 'test'){
                logger.info(mailer.mailDaemon.getTestMessageUrl(info));
            }
            return;
        });
    }
};