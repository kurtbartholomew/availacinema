const mailer = require('../config/mailer');
const logger = require('../config/logger');


module.exports = {
    async sendConfirmationEmail(email) {
        const FROM_LINE = 'admin@availacinema.io';
        const SUBJECT  = 'Email Confirmation for AvailaCinema';

        mailer.sendMail(FROM_LINE, email, SUBJECT, "Hello", (err, info) => {
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