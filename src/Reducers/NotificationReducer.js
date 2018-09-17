import {
    CONTACT_OPTION_TOGGLED,
    CONTACT_EMAIL_UPDATED,
    CONTACT_PHONE_UPDATED
} from '../Actions/types';
import { CONTACT_OPTIONS } from '../Constants';

const INITIAL_STATE = {
    contactOptions: {},
    contactPhone: {
        value: "",
        valid: false
    },
    contactEmail: {
        value: "",
        valid: false
    }
};

for( let option in CONTACT_OPTIONS ) {
    INITIAL_STATE.contactOptions[option] = false;
}

export default ( state=INITIAL_STATE, action) => {
    switch( action.type ) {
        case CONTACT_OPTION_TOGGLED:
            const option = action.payload;
            const newOptions = {...state.contactOptions}
            newOptions[option] = !newOptions[option];
            return  {...state, contactOptions: newOptions};
        case CONTACT_EMAIL_UPDATED:
            const { value, valid } = action.payload;
            const newContactEmail = { ...state.contactEmail, value: value, valid: valid }
            return { ...state, contactEmail: newContactEmail };
        case CONTACT_PHONE_UPDATED:
            const newContactPhone = { ...state.contactPhone, contactPhone: action.payload }
            return { ...state, contactPhone: newContactPhone };
        default:
            return state;
    }
}