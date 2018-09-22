const nodemailer = require('nodemailer');
const logger = require('./logger');

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
});

module.exports = {
    sendMail(from, to, subject, text, cb) {
        transporter.sendMail({
            from,
            to,
            subject,
            text
        }, cb);
    }
}