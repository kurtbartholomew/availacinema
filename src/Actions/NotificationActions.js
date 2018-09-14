import {
    EMAIL_DAILY_TOGGLED,
    EMAIL_WEEKLY_TOGGLED,
    TEXT_DAILY_TOGGLED,
    TEXT_WEEKLY_TOGGLED,
    CONTACT_EMAIL_UPDATED,
    CONTACT_EMAIL_VALIDATED,
    CONTACT_PHONE_UPDATED,
    CONTACT_PHONE_VALIDATED
} from './types';

export const emailyDailyToggled = () => {
    return {
        type: EMAIL_DAILY_TOGGLED
    }
}
export const emailWeeklyToggled = () => {
    return {
        type: EMAIL_WEEKLY_TOGGLED
    }
}
export const textDailyToggled = () => {
    return {
        type: TEXT_DAILY_TOGGLED
    }
}
export const textWeeklyToggled = () => {
    return {
        type: TEXT_WEEKLY_TOGGLED
    }
}
export const emailyDailyToggled = () => {
    return {
        type: EMAIL_DAILY_TOGGLED
    }
}

export const contactEmailUpdated = (contactEmail) => {
    return {
        type: CONTACT_EMAIL_UPDATED,
        payload: contactEmail
    }
}

export const contactEmailValidated = () => {
    return {
        type: CONTACT_EMAIL_VALIDATED
    }
}
export const contactPhoneUpdated = (contactPhone) => {
    return {
        type: CONTACT_PHONE_UPDATED,
        payload: contactPhone
    }
}
export const contactPhoneValidated = () => {
    return {
        type: CONTACT_PHONE_VALIDATED
    }
}