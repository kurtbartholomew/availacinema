const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const winstonLogger = require('./config/logger');
const logger = require('morgan');

const apiRouter = require('./routes/api');

const app = express();

app.use(logger('common', {stream: winstonLogger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')))
app.use('/api', apiRouter);
app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = app;
