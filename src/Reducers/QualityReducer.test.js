import QualityReducer from './QualityReducer';
import * as types from '../Actions/types';


describe('Quality Reducer', () => {
   
    let startState;

    beforeEach(() => {
        startState = {
            selected: false,
            value: 5,
            editable: false
        };
    });

    it('should return the initial state', () => {
        expect(QualityReducer(undefined, {})).toEqual(
            startState
        );
    });

    it('should handle the RATING_UPDATED action', () => {
        expect(QualityReducer(startState,{
            type: types.RATING_UPDATED,
            payload: 7.3
        })).toEqual({
            selected: true,
            value: 7.3,
            editable: false
        }); 
    });

    it('should handle the RATING_TEXT_FIELD_TOGGLED action', () => {
        expect(QualityReducer(startState,{
            type: types.RATING_TEXT_FIELD_TOGGLED
        })).toEqual({
            selected: false,
            value: 5,
            editable: true
        }); 
    });

});