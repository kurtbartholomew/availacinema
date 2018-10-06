const router = require('express-promise-router')();
const tmdb = require('../services/TmdbService');
const UserService = require('../services/UserService');
const ConfirmationService = require('../services/ConfirmationService');
const logger = require('../config/logger');
const cache = require('../db/cache');


router.get('/genres', async (req, res, next) => {
    try {
        let genres = await cache.getGroupFromCache('genres');
        if(!genres || genres.length === 0) {
            genres = await tmdb.getGenres();
            cache.putInCache('genres', 'id', genres, 360);
        } 
        res.json(genres);
    } catch(e) {
        logger.error(e.stack);
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

    const errors = validateUserDetails(phone, email, filters);
    if(errors.length) {
        return res.status(400).json({errors});
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
    const guid = req.params.guid;
    if(!guid) {
        let error = "Invalid confirmation token";
        res.status(400).json({error});
    }
    ConfirmationService.confirmValidUserSubscription(guid)
    .then(() => {
        res.redirect(301, '/verified');
    })
    .catch((e)=> {
        res.status(400,{error:"Unable to confirm method of notification"});
    });
});

router.get('/unsubscribe/:guid', (req, res, next) => {
    const guid = req.params.guid;
    if(!guid) {
        let error = "Invalid token to unsubscribe with";
        res.status(400).json({error});
    }
    ConfirmationService.unsubscribeFromSubscription(guid)
    .then(() => {
        res.redirect(301, '/unsubscribed');
    })
    .catch((e)=> {
        res.status(400,{error: "Unable to remove subscription with that id"});
    });
});

function validateUserDetails(phone, email, filters) {
    const errors = [];
    if(phone === undefined && email === undefined) {
        errors.push("Invalid subscription: A phone number or email must be provided");
    }
    if(filters === undefined) {
        errors.push("Invalid filters: Missing valid filters for genres or ratings");
    }
    if(phone && (phone.daily === false && phone.weekly === false)) {
        errors.push("Invalid phone subscription: daily or weekly must be set to true");
    }
    if(email && (email.daily === false && email.weekly === false)) {
        errors.push("Invalid email subscription: daily or weekly must be set to true");
    }
    return errors;
}

module.exports = router;