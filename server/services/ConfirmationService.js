const User = require('../models/User');
const Confirmations = require('../models/Confirmations');
const logger = require('../config/logger');

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
    },
    async sendConfirmations(userId, phone, email) {
        const existingConfirmations = await Confirmations.findByUserId(userId);
        // if(phone) {
        //     const existingPhoneConfirm = existingConfirmations.reduce((accum, current)=>{
        //         return accum || current.type === Confirmations.TYPE.PHONE;
        //     }, false);
        //     if(!existingPhoneConfirm) {
        //         await PhoneMessageService.sendConfirmationText();
        //     } else {
        //         // Throw Error? Inform User?
        //     }
        // }
        if(email) {
            const existingEmailConfirm = existingConfirmations.reduce((accum, current)=>{
                return accum || current.type === Confirmations.TYPE.EMAIL;
            }, false);
            if(!existingEmailConfirm) {
                await EmailMessageService.sendConfirmationEmail();
            } else {
               // Throw Error? Inform User? 
            }
        }
    }
}