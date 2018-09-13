import {
    GENRE_SELECTED
} from './types';

export const textChanged = (genre) => {
    return {
        type: GENRE_SELECTED,
        payload: genre
    };
}