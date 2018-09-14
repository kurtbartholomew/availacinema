import {
    GENRE_TOGGLED,
    ALL_GENRES_SELECTED,
    ALL_GENRES_DESELECTED
} from './types';

export const genreToggled = (genreId) => {
    return {
        type: GENRE_TOGGLED,
        payload: genreId
    };
}

export const allGenresSelected = () => {
    return {
        type: ALL_GENRES_SELECTED
    }
}

export const allGenresDeselected = () => {
    return {
        type: ALL_GENRES_DESELECTED
    }
}