const rp = require('request-promise');

const TMDB_API_KEY = process.env.API_KEY;

const TMDB_BASE_URI = 'https://api.themoviedb.org/3';

function getGenres(cb) {
    const options = {
        uri: `${TMDB_BASE_URI}/genre/movie/list?language=en-US`,
        qs: {
            api_key: TMDB_API_KEY
        },
        json: true
    }
    rp(options)
    .then((genreResponse) => {
        const genres = genreResponse.genres;
        return genres.map((genre) => {
            return genre.name;
        });
    })
    .then(cb)
    .catch((error) => {
        throw error;
    });
}

const TMDB = {
    getGenres
};

module.exports = TMDB;