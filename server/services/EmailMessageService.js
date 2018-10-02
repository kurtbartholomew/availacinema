const mailer = require('../config/mailer');
const templater = require('pug');
const path = require('path');
const moment = require('moment');

const confirmTemplateRelative = '../config/templates/confirmation.pug';
const confirmationTemplatePath = path.resolve(__dirname, confirmTemplateRelative);
const confirmationTemplateLoader = templater.compileFile(confirmationTemplatePath);

const suggestionsTemplateRelative = '../config/templates/suggestions.pug';
const suggestionsTemplatePath = path.resolve(__dirname, suggestionsTemplateRelative);
const suggestionsTemplateLoader = templater.compileFile(suggestionsTemplatePath);



const FROM_LINE = 'admin@availacinema.com';
const SUBJECT  = 'Email Confirmation for AvailaCinema';
const DOMAIN = process.env.DOMAIN || 'https://availacinema.com';

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
    },
    async sendSuggestionsEmail(recipientEmail, suggestions, isDaily) {
        if(recipientEmail === undefined) {
            throw new Error("Recipient email was undefined or not passed");
        }
        if(suggestions === undefined || suggestions.length === 0) {
            throw new Error(`No suggestions passed for email ${recipientEmail}`);
        }
        const body = suggestionsTemplateLoader({
            suggestions,
            isDaily,
            date: moment().utc().format('LL')
        });

        await mailer.sendMail(FROM_LINE, recipientEmail, SUBJECT, body);
        return true;
    },
    async sendSuggestionsText(recipientPhoneNumber, suggestions) {
        return true;
    },
    async queueSuggestionsEmail(email, suggestions, isDaily, queue) {
        queue.create('email', {
            email,
            suggestions,
            isDaily
        })
        .attempts(3)
        .backoff({delay: 5000, type:'exponential'})
        .removeOnComplete( true )
        .ttl(30000)
        .save();
    }
};