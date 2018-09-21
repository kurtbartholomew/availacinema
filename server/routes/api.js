const express = require('express');
const router = express.Router();
const tmdb = require('../services/tmdb');
const UserService = require('../services/UserService');
const logger = require('../config/logger');


router.get('/genres', (req, res, next) => {
    tmdb.getGenres((genres)=>{
        res.json(genres);
    });
});

router.post('/user', (req, res, next) => {
    const {
        username,
        password,
        phone,
        email,
        filters
    } = req.body;

    if(phone === undefined && email === undefined) {
        let error = "Missing either a valid phone or email address";
        logger.error(error);
        return res.status(400).json({error});
    }
    if(filters === undefined) {
        let error  = "Missing valid filters for genres or ratings";
        logger.error(error);
        return res.status(400).json({error});
    }
    UserService.addUser(username, password, phone, email, filters)
    .then(()=>{
        res.status(200).json({success: "User created successfully"});
    })
    .catch((e) => {
        logger.error(e);
        let error = "User creation failed. Please try again later";
        res.status(400).json({error});
    });
});

module.exports = router;