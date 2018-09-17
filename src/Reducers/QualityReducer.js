import {
    RATING_UPDATED,
    RATING_TEXT_FIELD_TOGGLED
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
        default:
            return state;
    }
}