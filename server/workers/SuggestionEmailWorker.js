require('dotenv').config();
const db = require('../db');
const schedule = require('node-schedule');
const User = require('../models/User');
const SuggestionService = require('../services/SuggestionService');
const logger = require('../config/logger');

async function queueEmailsForUsers(users, isDaily) {
    try {
        for(let user of users) {
            await SuggestionService.getAndSendSuggestionsToUser(user.id,user.email, isDaily);
        }
    } catch(e) {
        logger.error(e);
    }
}

async function queueDailyEmailsForUsers() {
    logger.info("Queue Suggestion Emails For Users Daily Job Running");
    try {
        const usersToQueryFor = await User.findUsersWithConfirmedEmail();
        let dailyUsers = usersToQueryFor.filter((user)=> {
            return user.email_daily === true;
        });
        await queueEmailsForUsers(dailyUsers, true);
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
        await queueEmailsForUsers(weeklyUsers, true); 
    } catch(e) {
        logger.error(e);
    }
}



const SuggestionEmailWorker = {
    queueEmailsForUsers
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