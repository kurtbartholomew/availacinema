import {
    CONTACT_OPTION_TOGGLED,
    CONTACT_EMAIL_UPDATED,
    CONTACT_PHONE_UPDATED,
} from './types';

export const contactOptionToggled = (optionName) => {
    return {
        type: CONTACT_OPTION_TOGGLED,
        payload: optionName
    }
}

export const contactEmailUpdated = (contactEmail) => {
    return {
        type: CONTACT_EMAIL_UPDATED,
        payload: contactEmail
    }
}

export const contactPhoneUpdated = (contactPhone) => {
    return {
        type: CONTACT_PHONE_UPDATED,
        payload: contactPhone
    }
}