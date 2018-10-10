const User = require('../models/User');
const Confirmation = require('../models/Confirmation');
const EmailMessageService = require('../services/EmailMessageService');
const logger = require('../config/logger');

async function confirmValidUserSubscription(guid) {
    const results = await Confirmation.findByGuid( guid );
    if(!results.length) {
        throw new Error(`Confirmation guid does not exist: ${guid}`);
    }
    const confirmation = results[0];
    if(confirmation.type === Confirmation.TYPE.PHONE) {
        await User.confirmUserPhone(confirmation.user_id);
    }
    if(confirmation.type === Confirmation.TYPE.EMAIL) {
        await User.confirmUserEmail(confirmation.user_id);
    }
}
async function sendConfirmations(userId, phone, email) {
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
}
async function unsubscribeFromSubscription(guid) {
    const results = await Confirmation.findByGuid( guid );
    if(!results.length) {
        throw new Error(`Subscription guid does not exist: `+guid);
    }
    const confirmation = results[0];
    await User.deleteUser(confirmation.user_id);
}
async function retrieveConfirmationByPhoneNumber(phoneNumber) {
    const user = await User.findByPhoneOrEmail(phoneNumber);
    if(!user.length) {
        throw new Error(`User doesn't exist with phone number: ${phoneNumber}`);
    }
    const confirmation = await Confirmation.findByUserId(user.id);
    if(!confirmation.length) {
        throw new Error(`Confirmation doesn't exist with user id: ${user.id}`)
    }
    return confirmation;
}
async function confirmUserByPhoneNumber(phoneNumber) {
    const confirmation = await retrieveConfirmationByPhoneNumber(phoneNumber);
    await confirmValidUserSubscription(confirmation.guid);
}
async function unsubscribeUserByPhoneNumber(phoneNumber) {
    const confirmation = await retrieveConfirmationByPhoneNumber(phoneNumber);
    await unsubscribeFromSubscription(confirmation.guid);
}

module.exports = {
    confirmValidUserSubscription,
    sendConfirmations,
    unsubscribeFromSubscription,
    retrieveConfirmationByPhoneNumber,
    confirmUserByPhoneNumber,
    unsubscribeUserByPhoneNumber 
}