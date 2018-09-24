require('dotenv').config();
const db = require('../db');
const User = require('../models/User');
const Movie = require('../models/Movie');
const Suggestion = require('../models/Suggestion');
const Genre = require('../models/Genre');
const UserFilter = require('../models/UserFilter');
const MovieGenre = require('../models/MovieGenre');
const Confirmation = require('../models/Confirmation');

const tables = [
    User.TABLE,
    Movie.TABLE,
    Genre.TABLE,
    UserFilter.TABLE,
    MovieGenre.TABLE,
    Confirmation.TABLE,
    Suggestion.TABLE,
];

const fullTableList = tables.join(', ');

const seedData = require('../db/seeds.json');

async function seedTables() {
    try {
        // First insert query doesn't actually make it to the database but returns ids
        // this method breaks on anything needing a valid user id in the db
        const userIdArr = await db(User.TABLE).insert(seedData.users[0]).returning('id');
        const movieIdArr = await db(Movie.TABLE).insert(seedData.movies).returning('id');
        const genreIdArr = await db(Genre.TABLE).insert(seedData.genres).returning('id');
        const suggestions = seedData.suggestions.map((suggestion)=>{
            suggestion.user_id = userIdArr[0]
            return suggestion;
        });
        const userFilters = seedData.users_filters.map((userFilter)=>{
            userFilter.user_id = userIdArr[0];
            return userFilter;
        });
        const movieGenres = [
            {
                genre_id: genreIdArr[0],
                movie_id: movieIdArr[0]
            },
            {
                genre_id: genreIdArr[1],
                movie_id: movieIdArr[0]
            },
            {
                genre_id: genreIdArr[0],
                movie_id: movieIdArr[1]
            },
            {
                genre_id: genreIdArr[0],
                movie_id: movieIdArr[2]
            },
            {
                genre_id: genreIdArr[2],
                movie_id: movieIdArr[2]
            }
        ];
        const confirmations = seedData.confirmations.map((confirmation)=>{
            confirmation.user_id = userIdArr[0];
            return confirmation;
        });
        
        await db(Suggestion.TABLE).insert(suggestions);
        await db(UserFilter.TABLE).insert(userFilters);
        await db(MovieGenre.TABLE).insert(movieGenres);
        await db(Confirmation.TABLE).insert(confirmations);
    } catch(e) {
        console.log("ERROR");
        console.log(e);
    }
};

async function clearTables(...tables) {
    let tableList = fullTableList;
    if(tables !== undefined && tables.length) {
        tableList = tables.join(', ');
    }
    await db.raw(`TRUNCATE ${tableList} RESTART IDENTITY CASCADE`);
};

async function resetTables() {
    clearTables();
    seedTables();
}

module.exports = {
    seedTables,
    clearTables,
    resetTables
};