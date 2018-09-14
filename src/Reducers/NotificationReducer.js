import {
    EMAIL_DAILY_TOGGLED,
    EMAIL_WEEKLY_TOGGLED,
    TEXT_DAILY_TOGGLED,
    TEXT_WEEKLY_TOGGLED,
    CONTACT_EMAIL_UPDATED,
    CONTACT_EMAIL_VALIDATED,
    CONTACT_PHONE_UPDATED,
    CONTACT_PHONE_VALIDATED
} from '../Actions/types';

const INITIAL_STATE = {

};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case EMAIL_DAILY_TOGGLED:
        case EMAIL_WEEKLY_TOGGLED:
        case TEXT_DAILY_TOGGLED:
        case TEXT_WEEKLY_TOGGLED:
        case CONTACT_EMAIL_UPDATED:
        case CONTACT_EMAIL_VALIDATED:
        case CONTACT_PHONE_UPDATED:
        case CONTACT_PHONE_VALIDATED:
        default:
            return state;
    }
}