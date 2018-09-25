const nodemailer = require('nodemailer');
const logger = require('../config/logger');

module.exports = {
    async sendMail(from, to, subject, html) {
        const transporter = await assignTransporter();
        try {
            const response = await transporter.sendMail({
                from,
                to,
                subject,
                html
            });
            if(process.env.NODE_ENV === 'test'){
                logger.info(nodemailer.getTestMessageUrl(response));
            }
        } catch(e) {
            logger.error("An error occurred while trying to send a test email: "+e.message);
        }
    },
    mailDaemon: nodemailer
}

async function assignTransporter() {
    let config;
    if(process.env.NODE_ENV === 'production') {
        config = {
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                type: 'login',
                user: 'apikey',
                pass: process.env.SENDGRID_API_KEY
            }
        };
    } else {
        try {
            const account = await nodemailer.createTestAccount();
            config = {
                host: account.smtp.host,
                port : account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            };
        } catch(e) {
            logger.error('Failed to create a test account: ' + err.message);
        }
    }
    return nodemailer.createTransport(config);
}