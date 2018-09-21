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
        const filtersWithId = filters.map((filter)=> {
            return filter.user_id = userResult.id;
        });
        await UserFilter.add(filtersWithId);
    }
}