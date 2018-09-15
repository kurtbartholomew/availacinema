import {
    RATING_UPDATED,
    RATING_TEXT_FIELD_TOGGLED
} from './types';

export const ratingUpdated = ( rating ) => {
    return {
        type: RATING_UPDATED,
        payload: rating
    }
}

export const ratingTextFieldToggled = () => {
    return {
        type: RATING_TEXT_FIELD_TOGGLED
    }
}