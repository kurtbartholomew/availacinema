require('dotenv').config();
const db = require('../db');
const schedule = require('node-schedule');
const User = require('../models/User');
const SuggestionService = require('../services/SuggestionService');
const logger = require('../config/logger');
const kue = require('kue');

const utils = {
    async queueEmailsForUsers(users, isDaily) {
        try {
            const queue = kue.createQueue();
            for(let user of users) {
                await SuggestionService.getAndSendSuggestionsToUser(user.id, user.email, isDaily, queue);
            }
            queue.shutdown(60000);
        } catch(e) {
            logger.error(e);
        }
    }
}

async function queueDailyEmailsForUsers() {
    logger.info("Queue Suggestion Emails For Users Daily Job Running");
    try {
        const usersToQueryFor = await User.findUsersWithConfirmedEmail();
        let dailyUsers = usersToQueryFor.filter((user)=> {
            return user.email_daily === true;
        });
        await utils.queueEmailsForUsers(dailyUsers, true);
    } catch(e) {
        logger.error(e);
    }
}

async function queueWeeklyEmailsForUsers() {
    logger.info("Queue Suggestion Emails For Users Weekly Job Running");
    try {
        const usersToQueryFor = await User.findUsersWithConfirmedEmail();
        let weeklyUsers = usersToQueryFor.filter((user)=> {
            return user.email_weekly === true;
        });
        await utils.queueEmailsForUsers(weeklyUsers, true); 
    } catch(e) {
        logger.error(e);
    }
}

const SuggestionEmailWorker = {
    utils,
    queueDailyEmailsForUsers,
    queueWeeklyEmailsForUsers
};
module.exports = SuggestionEmailWorker;

if(process.env.NODE_ENV === 'production') {
    schedule.scheduleJob({hour: 13, minute: 0, dayOfWeek: 2}, function weeklySuggestionEmailJob(){
        queueWeeklyEmailsForUsers();
    });
    schedule.scheduleJob({hour: 13, minute: 0}, function dailySuggestionEmailJob(){
        queueDailyEmailsForUsers();
    });
}