import {
    GENRE_SELECTED
} from '../Actions/types';

const INITIAL_STATE = [

];


export default ( state=INITIAL_STATE, action ) => {
    switch(action.type) {
        case GENRE_SELECTED:
            return { ...state, genres: action.payload };
        default:
            return state;
    }
}