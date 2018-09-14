import { combineReducers } from 'redux';
import GenreReducer from './GenreReducer';
import QualityReducer from './QualityReducer';
import NotificationReducer from './NotificationReducer';

export default combineReducers({
    genres: GenreReducer,
    quality: QualityReducer,
    notifications: NotificationReducer
});