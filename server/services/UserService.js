const User = require('../models/User');
const UserFilter = require('../models/UserFilter');

module.exports = {
    async addUser(username, password, phone, email, filters) {
        const results = await User.findByPhoneOrEmail( phone.value, email.value );
        if(!results.isEmpty()) {
            throw new Error(`User already exists with phone ${phone.value} or email ${email.value}`);
        }
        // TODO: Make these two a transaction
        const userResult = await User.add(username, password, phone, email);
        let genreFilterCount = 0;
        let ratingFilter = false;
        for(let filter of filters) {
            filter.user_id = userResult.id;
            if(filter.type == 0) { ratingFilter = true; }
            if(filter.type == 1) { ++genreFilterCount; }
        }
        if(ratingFilter === false) {
            throw new Error('Cannot subscribe a user with no rating filter');
        }
        if(genreFilterCount === 0) {
            throw new Error('Cannot subscribe a user with no genre filters');
        }
        await UserFilter.add(filtersWithId);
    }
}