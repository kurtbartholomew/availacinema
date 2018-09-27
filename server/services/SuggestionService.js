require('dotenv').config();
const db = require('../db');
const UserFilter = require('../models/UserFilter');
const Movie = require('../models/Movie');
const MovieGenre = require('../models/MovieGenre');
const Genre = require('../models/Genre');
const Suggestion = require('../models/Suggestion');
const EmailMessageService = require('../services/EmailMessageService');
const moment = require('moment');


module.exports = {
    async getSuggestionsForUser(userId, email, isDaily) {
        const filters = UserFilter.findByUserId(userId);
        const { genreFilters, ratingFilter } = extractFilters(filters);
        const movies = await findMoviesMatchingUserFilters(genreFilters,ratingFilter, isDaily);
        if(movies && movies.length) {
            const suggestions = [];
            for(let movie in movies) {
                suggestions.push({
                    title: movie.title,
                    rating: movie.rating,
                    userId,
                    movieId: movie.id
                });
            }
            await Suggestion.addAll(suggestions);
            await EmailMessageService.sendSuggestionsEmail(email, suggestions, isDaily);
        }
    }
}

// TODO: Figure out a way to reduce coupling
// The other option was put it in the model but I'm not sure its any
// better to hardcode so much business logic in the data models
function findMoviesMatchingUserFilters(genreFilters, ratingFilter, isDaily) {
    const genreIds = genreFilters.map((filter)=> filter.value);
    let date = isDaily ? moment().utc() : moment().utc().subtract(7,'days');
    date = date.format('YYYY-MM-DD');
    return db(Movie.TABLE)
            .distinct()
            .select(`${Movie.TABLE}.*`)
            .join(`${MovieGenre.TABLE}`, `${Movie.TABLE}.id`, '=', `${MovieGenre.TABLE}.movie_id`)
            .join(`${Genre.TABLE}`, `${MovieGenre.TABLE}.genre_id`, '=', `${Genre.TABLE}.id`)
            .whereIn(`${Genre.TABLE}.tmdb_id`, genreIds)
            .andWhere(`${Movie.TABLE}.rating`,'>=',ratingFilter.value)
            .andWhere(`${Movie.TABLE}.release_date`,'>=', date)
            .orderBy(`${Movie.TABLE}.rating`, 'desc');
}

function extractFilters(filters) {
    let ratingFilter, genreFilters;
    if(filters && filters.length) {
        const ratingFilterIdx = filters.findIndex((filter) => {
            return filter.type === UserFilter.TYPE.RATING
        });
        if(ratingFilterIdx !== -1) {
            ratingFilter = filters[ratingFilterIdx];
            genreFilters = filters.filter((_, idx)=>{
                return idx !== ratingFilterIdx;
            });
            if(genreFilters.length === 0) {
                throw new Error(`Invalid user: No genre filters exist for user ${userId}`);
               // TODO: Delete user and associated filters if invalid filters? 
            }
        } else {
            // TODO: Delete user and associated filters if invalid filters?
            throw new Error(`Invalid user: No rating filter exists for user ${userId}`);
        }
    } else {
        throw new Error(`Invalid user: No filters exist for user ${userId}`);
    }

    return {
        ratingFilter,
        genreFilters
    };
}