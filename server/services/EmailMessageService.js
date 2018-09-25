const mailer = require('../config/mailer');
const templater = require('pug');
const path = require('path');
const confirmTemplateRelative = 'config/templates/confirmation.pug';
const confirmationTemplatePath = path.join(process.cwd(),confirmTemplateRelative);
const confirmationTemplateLoader = templater.compileFile(confirmationTemplatePath);


const FROM_LINE = 'admin@availacinema.com';
const SUBJECT  = 'Email Confirmation for AvailaCinema';
const DOMAIN = 'http://availacinema.com';

module.exports = {
    async sendConfirmationEmail(recipientEmail, confirmationGuid) {
        if(recipientEmail === undefined) {
            throw new Error("Recipient email was undefined or not passed");
        }
        if(confirmationGuid === undefined) {
            throw new Error("Confirmation guid was undefined or not passed");
        }
        const body = confirmationTemplateLoader({
            notificationLink: `${DOMAIN}/api/confirm/${confirmationGuid}`
        });

        await mailer.sendMail(FROM_LINE, recipientEmail, SUBJECT, body);
        return true;
    }
};