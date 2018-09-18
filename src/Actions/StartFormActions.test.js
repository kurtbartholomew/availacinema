import * as actions from './StartFormActions';
import * as types from './types';
import { PANEL_STATE } from '../Constants';

describe('Start Form Actions', () => {

    it('should create an action to toggle a form\'s active status', () => {
        const formId = 3;
        const expectedAction = {
            type: types.TOGGLE_SELECTED_FORM,
            payload: formId
        };
        expect(actions.toggleSelectedForm(formId)).toEqual(expectedAction);
    });

    it('should create an action to validate or invalidate the state of a form', () => {
        const formId = 2;
        const panelState = PANEL_STATE.VALID;
        const formIdAndPanelState = {
            formId: formId,
            panelState: panelState
        }
        const expectedAction = {
            type: types.CHANGE_PANEL_STATE,
            payload: formIdAndPanelState
        };
        expect(actions.changePanelState(formId, panelState)).toEqual(expectedAction);
    });
});