const User = require('../models/User');
const Confirmation = require('../models/Confirmation');
const EmailMessageService = require('../services/EmailMessageService');
const logger = require('../config/logger');

module.exports = {
    async confirmValidUserSubscription(guid) {
        const results = await Confirmation.findByGuid( guid );
        if(!results.length) {
            throw new Error(`Confirmation guid does not exist: `+guid);
        }
        const confirmation = results[0];
        if(confirmation.type === Confirmation.TYPE.PHONE) {
            await User.confirmUserPhone(confirmation.user_id);
        }
        if(confirmation.type === Confirmation.TYPE.EMAIL) {
            await User.confirmUserEmail(confirmation.user_id);
        }
    },
    async sendConfirmations(userId, phone, email) {
        const existingConfirmations = await Confirmation.findByUserId(userId);
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
                return accum || current.type === Confirmation.TYPE.EMAIL;
            }, false);
            // prevent email spam if confirmation already sent
            if(!existingEmailConfirm) {
                const guids = await Confirmation.add(Confirmation.TYPE.EMAIL, userId);
                await EmailMessageService.sendConfirmationEmail(email.value, guids[0]);
            } else {
               // Throw Error? Inform User?
            }
        }
    },
    async unsubscribeFromSubscription(guid) {
        const results = await Confirmation.findByGuid( guid );
        if(!results.length) {
            throw new Error(`Confirmation guid does not exist: `+guid);
        }
        const confirmation = results[0];
        await User.deleteUser(confirmation.user_id);
    }
}