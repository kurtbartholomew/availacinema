import {
    RATING_UPDATED
} from '../Actions/types';

const INITIAL_STATE = {
    selected: false,
    value: 5,
    editable: false
};

export default ( state=INITIAL_STATE, action ) => {
    switch( action.type ) {
        case RATING_UPDATED:
            return { ...state, ratingValue: action.payload, selected: true };
        case RATING_TEXT_FIELD_TOGGLED:
            return { ...state, editable: !state.editable }
        default:
            return state;
    }
}