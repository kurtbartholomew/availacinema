import {
    RATING_SELECTED,
    RATING_UPDATED
} from './types';

export const ratingSelected = (rating) => {
    return {
        type: RATING_SELECTED,
        payload: rating
    }
}

export const ratingUpdated = (rating) => {
    return {
        type: RATING_UPDATED,
        payload: rating
    }
}