require('dotenv').config();
const db = require('../db');
const schedule = require('node-schedule');
const Genre = require('../models/Genre');
const Movie = require('../models/Movie');
const MovieGenre = require('../models/MovieGenre');
const TmdbService = require('../services/TmdbService');
const logger = require('../config/logger');
const rule = new schedule.RecurrenceRule();
rule.hour = 13;

async function queueEmailsForUsers() {
    logger.info("Queue Suggestion Emails For Users Job Running");
    try {
        const currentGenres = await Genre.all();
        const genres = await TmdbService.getGenres();
        logger.info(`Retrieved ${genres.length} genres from Tmdb`);
        if(currentGenres.length === 0) {
            for(let genre of genres) {
                await Genre.add(genre.name,genre.id);
            }
        } else {
            for(let genre of genres) {
                await Genre.update(genre.name,genre.id);
            }
        }
        logger.info('Updated or added genres to database');
    } catch(e) {
        logger.error(e);
    }
}



const SuggestionEmailWorker = {
    queueEmailsForUsers
};
module.exports = SuggestionEmailWorker;

// schedule.scheduleJob(rule, async function(){

// });