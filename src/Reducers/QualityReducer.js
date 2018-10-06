import {
    RATING_UPDATED,
    RATING_TEXT_FIELD_TOGGLED,
    SUBSCRIPTION_SUBMIT_SUCCESS
} from '../Actions/types';

const INITIAL_STATE = {
    selected: false,
    value: 5,
    editable: false
};

export default ( state=INITIAL_STATE, action ) => {
    switch( action.type ) {
        case RATING_UPDATED:
            return { ...state, value: action.payload, selected: true };
        case RATING_TEXT_FIELD_TOGGLED:
            return { ...state, editable: !state.editable }
        case SUBSCRIPTION_SUBMIT_SUCCESS:
            return INITIAL_STATE;
        default:
            return state;
    }
}