const nodemailer = require('nodemailer');
const logger = require('../config/logger');

module.exports = {
    async sendMail(from, to, subject, text) {
        const transporter = await assignTransporter();
        return transporter.sendMail({
            from,
            to,
            subject,
            text
        });
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
        config = await createTestAccountAsync();
    }
    return nodemailer.createTransport(config);
}

function createTestAccountAsync() {
    return new Promise(function(resolve, reject) {
        nodemailer.createTestAccount((err, account) => {
            if(err) {
                reject(err);
                logger.error('Failed to create a test account: '+ err.message);
                return;
            }
    
            resolve({
                host: account.smtp.host,
                port : account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
        });
    });
}