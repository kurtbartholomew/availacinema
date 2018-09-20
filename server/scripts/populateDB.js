const User = require('../models/Genre');
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

    // join tables
    await UserFilter.createTable();
    await MovieGenre.createTable();
})();