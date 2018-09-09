const express = require('express');
const router = express.Router();
const tmdb = require('../services/tmdb');

router.get('/genres', (req, res, next) => {
    tmdb.getGenres((genres)=>{
        res.json(genres);
    });
});

module.exports = router;