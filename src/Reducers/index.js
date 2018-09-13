import { combineReducers } from 'redux';
import GenreReducer from './GenreReducer';

export default combineReducers({
    genreReducer: GenreReducer
});