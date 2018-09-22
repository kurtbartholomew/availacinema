const User = require('../models/User');
const UserFilter = require('../models/UserFilter');

module.exports = {
    async addUser(username, password, phone, email, filters) {
        const results = await User.findByPhoneOrEmail( phone, email );
        if(results.length) {
            throw new Error(`User already exists with phone ${phone ? phone.value : "undefined"} or email ${email ? email.value : "undefined"}`);
        }
        // TODO: Make the two model calls a transaction
        const userResult = await User.add(username, password, phone, email);
        decorateAndCheckFilters(filters, userResult.id);
        await UserFilter.add(filters);
    }
}

function decorateAndCheckFilters(filters, userId) {
    let genreFilterCount = 0;
    let ratingFilter = false;
    for(let filter of filters) {
        filter.user_id = userId;
        if(filter.type === UserFilter.TYPE.RATING) { ratingFilter = true; }
        if(filter.type === UserFilter.TYPE.GENRE) { ++genreFilterCount; }
    }
    if(ratingFilter === false) {
        throw new Error('Cannot subscribe a user with no rating filter');
    }
    if(genreFilterCount === 0) {
        throw new Error('Cannot subscribe a user with no genre filters');
    }
}