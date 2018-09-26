const winston = require('winston');
const path = require('path');
const { combine, colorize, printf, simple, timestamp } = winston.format;

var config = {
    file: {
        level: 'info',
        filename: `${path.resolve(__dirname,'../logs/app.log')}`,
        handleExceptions: true,
        json: true,
        format: simple(),
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false
    },
    errorFile: {
        level: 'error',
        filename: `${path.resolve(__dirname,'../logs/error.log')}`,
        handleExceptions: true,
        json: true,
        format: simple(),
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false
    },
    testFile: {
        level: 'info',
        filename: `${path.resolve(__dirname,'../logs/test.log')}`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        format: combine(timestamp(),simple()),
        maxFiles: 5,
        colorize: false
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        format: combine(colorize(),simple()),
        colorize: true
    }
};

const effectiveTransports = [];
const currentEnv = process.env.NODE_ENV;

if(currentEnv === 'development') {
    effectiveTransports.push(new winston.transports.Console(config.console));
}
if(currentEnv === 'production') {
    effectiveTransports.push(new winston.transports.File(config.file));
    effectiveTransports.push(new winston.transports.File(config.errorFile));
}
if(currentEnv === 'test') {
    effectiveTransports.push(new winston.transports.File(config.testFile)); 
}

const logger = winston.createLogger({
    transports: effectiveTransports,
    exitOnError: false
});

logger.stream = {
    write: function(message, encoding) {
        logger.debug(message);
    }
}

module.exports = logger;