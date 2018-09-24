const nodemailer = require('nodemailer');
const logger = require('../config/logger');

module.exports = {
    async sendMail(from, to, subject, text, cb) {
        const transporter = await assignTransporter();
        transporter.sendMail({
            from,
            to,
            subject,
            text
        }, cb);
    },
    mailDaemon: nodemailer
}

async function assignTransporter() {
    let transporter;
    if(process.env.NODE_ENV === 'test') {
        transporter = await createTestAccountAsync();
    } else {
        transporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'unix',
            path: '/usr/sbin/sendmail'
        });
    }
    return transporter;
}

function createTestAccountAsync() {
    return new Promise(function(resolve, reject) {
        nodemailer.createTestAccount((err, account) => {
            if(err) {
                reject(err);
                logger.error('Failed to create a test account: '+ err.message);
                return;
            }
    
            resolve(nodemailer.createTransport({
                host: account.smtp.host,
                port : account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            }));
        });
    });
}