require('dotenv').config();
const db = require('../db');
const schedule = require('node-schedule');
const Genre = require('../models/Genre');
const Movie = require('../models/Movie');
const MovieGenre = require('../models/MovieGenre');
const TmdbService = require('../services/TmdbService');
const logger = require('../config/logger');

async function retrieveGenresForUpdate() {
    logger.info("Retrieve Genres for Update Job Running");
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

async function retrieveEnglishMoviesReleasedDaily() {
    logger.info("Retrieve English Movies Released Today Job Running");
    try {
        const movies = await TmdbService.getEnglishMoviesReleasedToday();
        logger.info(`Retrieved ${movies.length} movies released today`);
        for(let movie of movies) {
            const found = await Movie.findByTmdbKey(movie.id);
            if(found.length === 0) {
                const details = await TmdbService.getMovieDetails(movie.id);
                const movieIds = await Movie.add(movie.title,movie.vote_average,new Date(),movie.id,details.imdb_id);
                if(details.genres) {
                    for(let genre of details.genres) {
                        const genreArr = await Genre.findByTMDBId(genre.id);
                        if(genreArr.length) {
                            await MovieGenre.add(movieIds[0],genreArr[0].id);
                        }
                    }
                }
            }
        }
        logger.info(`Incorporated movies into database`);
    } catch(e) {
        logger.error(e);
    }
}

const TmdbWorker = {
    retrieveGenresForUpdate,
    retrieveEnglishMoviesReleasedDaily
};
module.exports = TmdbWorker;

schedule.scheduleJob({hour: 13, minute: 0}, async function(){
    await retrieveGenresForUpdate();
    await retrieveEnglishMoviesReleasedDaily();
});