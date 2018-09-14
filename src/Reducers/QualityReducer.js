import {
    RATING_SELECTED,
    RATING_UPDATED
} from '../Actions/types';

const INITIAL_STATE = {

};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case RATING_SELECTED:
        case RATING_UPDATED:
        default:
            return state;
    }
}