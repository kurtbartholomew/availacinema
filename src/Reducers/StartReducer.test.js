import StartReducer from './StartReducer';
import * as types from '../Actions/types';
import { PANEL_STATE } from '../Constants';

describe('Start Reducer', () => {

    let startState;

    beforeEach(() => {
        startState = {
            allFormsValid: false,
            activeIdx: 0,
            isSubmitting: false,
            formChoices: [
                {
                    id: 0,
                    condition: PANEL_STATE.UNTOUCHED
                },
                {
                    id: 1,
                    condition: PANEL_STATE.UNTOUCHED
                },
                {
                    id: 2,
                    condition: PANEL_STATE.UNTOUCHED
                }
            ]
        }
    });

    it('should return the initial state', () => {
        expect(StartReducer(undefined, {})).toEqual(
            {
                allFormsValid: false,
                activeIdx: 0,
                isSubmitting: false,
                formChoices: [
                    expect.objectContaining({
                        id: 0,
                        condition: PANEL_STATE.UNTOUCHED
                    }),
                    expect.objectContaining({
                        id: 1,
                        condition: PANEL_STATE.UNTOUCHED
                    }),
                    expect.objectContaining({
                        id: 2,
                        condition: PANEL_STATE.UNTOUCHED
                    }),
                ]
            }
        );
    });

    it('should handle TOGGLE_SELECTED_FORM action', () => {
        expect(StartReducer(startState, {
            type: types.TOGGLE_SELECTED_FORM,
            payload: 1
        })).toEqual({
            allFormsValid: false,
            activeIdx: 1,
            isSubmitting: false,
            formChoices: expect.any(Array)
        });
    });

    it('should handle CHANGE_PANEL_STATE action', () => {
        expect(StartReducer(startState, {
            type: types.CHANGE_PANEL_STATE,
            payload: {
                formId: 0,
                panelState: PANEL_STATE.VALID
            }
        })).toEqual({
            allFormsValid: false,
            activeIdx: 0,
            isSubmitting: false,
            formChoices: [
                expect.objectContaining({
                    id: 0,
                    condition: PANEL_STATE.VALID
                }),
                expect.objectContaining({
                    id: 1,
                    condition: PANEL_STATE.UNTOUCHED
                }),
                expect.objectContaining({
                    id: 2,
                    condition: PANEL_STATE.UNTOUCHED
                }),
            ]
        });
    });
    
});