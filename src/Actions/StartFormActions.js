import {
    TOGGLE_SELECTED_FORM,
    CHANGE_PANEL_STATE
} from "../Actions/types";

export const toggleSelectedForm = (formId) => {
    return {
        type: TOGGLE_SELECTED_FORM,
        payload: formId
    }
}

export const changePanelState = (formId, panelState) => {
    return {
        type: CHANGE_PANEL_STATE,
        payload: {
            formId,
            panelState
        }
    }
}