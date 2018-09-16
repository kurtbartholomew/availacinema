import { combineReducers } from 'redux';
import GenreReducer from './GenreReducer';
import QualityReducer from './QualityReducer';
import NotificationReducer from './NotificationReducer';
import StartReducer from './StartReducer';

export default combineReducers({
    genres: GenreReducer,
    quality: QualityReducer,
    notifications: NotificationReducer,
    start: StartReducer
});