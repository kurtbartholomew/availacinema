require('dotenv').config();
const db = require('../db');
const User = require('../models/User');
const Movie = require('../models/Movie');
const Suggestion = require('../models/Suggestion');
const Genre = require('../models/Genre');
const UserFilter = require('../models/UserFilter');
const MovieGenre = require('../models/MovieGenre');

(async () => {
    // main tables
    await User.createTable();
    await Movie.createTable();
    await Suggestion.createTable();
    await Genre.createTable();

    // // join tables
    await UserFilter.createTable();
    await MovieGenre.createTable();
})().then(()=> {
    console.log("DB Population Finished");
    db.destroy();
}).catch((error)=> {
    console.log(error);
})