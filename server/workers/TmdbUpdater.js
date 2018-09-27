require('dotenv').config();
const db = require('../db');
const schedule = require('node-schedule');
const Genre = require('../models/Genre');
const Movie = require('../models/Movie');
const MovieGenre = require('../models/MovieGenre');
const TmdbService = require('../services/TmdbService');
const logger = require('../config/logger');
const rule = new schedule.RecurrenceRule();
rule.hour = 12;

async function retrieveGenresForUpdate() {
    try {
        const currentGenres = await Genre.all();
        const genres = await TmdbService.getGenres();
        if(currentGenres.length === 0) {
            for(let genre of genres) {
                await Genre.add(genre.name,genre.id);
            }
        } else {
            for(let genre of genres) {
                await Genre.update(genre.name,genre.id);
            }
        }
    } catch(e) {
        logger.error(e);
    }
    db.destroy();
}

async function retrieveEnglishMoviesReleasedDaily() {
    try {
        const movies = await TmdbService.getEnglishMoviesReleasedToday();
        for(let movie of movies) {
            const found = await Movie.findByTmdbKey(movie.id);
            if(found.length === 0) {
                const details = await TmdbService.getMovieDetails(movie.id);
                const movieIds = await Movie.add(movie.title,movie.vote_average,new Date(),movie.id,details.imdb_id);
                for(let genre of details.genres) {
                    const genreArr = await Genre.findByTMDBId(genre.id);
                    if(genreArr.length) {
                        await MovieGenre.add(movieIds[0],genreArr[0].id);
                    }
                }
            }
        }
    } catch(e) {
        logger.error(e);
    }
    db.destroy();
}

