const User = require('../models/User');
const Confirmations = require('../models/Confirmations');

module.exports = {
    async confirmValidUserSubscription(guid) {
        const result = await Confirmations.findByGuid( guid );
        if(!result.length) {
            throw new Error(`Confirmation guid does not exist: `+guid);
        }
        if(result.type === Confirmations.TYPE.PHONE) {
            await User.confirmUserPhone(result.user_id);
        }
        if(result.type === Confirmations.TYPE.EMAIL) {
            await User.confirmUserEmail(result.user_id);
        }
        
    }
}