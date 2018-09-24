const router = require('express-promise-router')();
const tmdb = require('../services/tmdb');
const UserService = require('../services/UserService');
const ConfirmationService = require('../services/ConfirmationService');
const logger = require('../config/logger');


router.get('/genres', async (req, res, next) => {
    try {
        const genres = await tmdb.getGenres(); 
        res.json(genres);
    } catch(e) {
        logger.error(error.stack);
        res.json({error: "Unable to retrieve genres"})
    }
});

router.post('/user', async (req, res, next) => {
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
    try {
        const userIdArr = await UserService.addUser(username, password, phone, email, filters);
        const userId = userIdArr[0];
        await ConfirmationService.sendConfirmations(userId, phone, email);
        res.status(200).json({success: "User created successfully"});
    } catch(e) {
        logger.error(e.stack);
        let error = "User subscription failed. Please try again later";
        res.status(400).json({error});
    }
});

router.get('/confirm/:guid', (req, res, next) => {
    const guid = request.params.guid;
    if(!guid) {
        let error = "Invalid confirmation token";
        res.status(400).json({error});
    }
    ConfirmationService.confirmValidUserSubscription(guid)
    .then(() => {
        res.redirect(301, '/confirmed');
    })
    .catch((e)=> {
        res.status(400,{error:"Unable to confirm method of notification"});
    });
});

module.exports = router;