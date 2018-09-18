import * as actions from './QualityActions';
import * as types from './types';

describe('Quality Form Actions', () => {

    it('should create an action to update the rating', () => {
        const rating = 5.3;
        const expectedAction = {
            type: types.CONTACT_OPTION_TOGGLED,
            payload: rating
        };
        expect(actions.ratingUpdated(rating)).toEqual(expectedAction);
    });

    it('should create an action to toggle the entry input for rating', () => {
        const expectedAction = {
            type: types.RATING_TEXT_FIELD_TOGGLED
        };
        expect(actions.ratingTextFieldToggled()).toEqual(expectedAction);
    });
});