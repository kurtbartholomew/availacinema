import {
    TOGGLE_SELECTED_FORM,
    CHANGE_PANEL_STATE
} from "../Actions/types";
import GenreFormContainer from '../Containers/GenreFormContainer';
import QualityFormContainer from '../Containers/QualityFormContainer';
import NotificationFormContainer from '../Containers/NotificationFormContainer';
import { PANEL_STATE } from '../Constants';

const INITIAL_STATE = {
    allFormsValid: false,
    activeIdx: 0,
    formChoices : [
        {
            id: 0,
            category: 'genre',
            title: 'Genre Filters',
            tooltip: 'What genres do you want to know about?',
            childForm: GenreFormContainer,
            condition: PANEL_STATE.UNTOUCHED,
            invalidMessage: 'Please select at least one genre.'
        },
        {
            id: 1,
            category: 'quality',
            title: 'Quality Filters',
            tooltip: 'How highly rated should each movie be?',
            childForm: QualityFormContainer,
            condition: PANEL_STATE.UNTOUCHED,
            invalidMessage: 'Please select a minimum rating.'
        },
        {
            id: 2,
            category: 'notification',
            title: 'Notification',
            tooltip: 'If a movie matches your filters, how often would you like to be notified?',
            childForm: NotificationFormContainer,
            condition: PANEL_STATE.UNTOUCHED,
            invalidMessage: 'Please choose a valid way you can be notified.'
        }
    ]
};

export default ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case TOGGLE_SELECTED_FORM:
            const newId = (state.activeIdx === action.payload) ?
                            -1 : action.payload;
            return { ...state, activeIdx: newId };
        case CHANGE_PANEL_STATE:
            const { formId, panelState } = action.payload;
            const formIdx = state.formChoices.findIndex((form)=>form.id === formId);
            const newForm = {...state.formChoices[formIdx], condition: panelState};
            const newFormChoices = [state.formChoices.slice(formIdx),
                                 newForm,
                                 state.formChoices.slice(formIdx+1)
                                ];
            const allValid = newFormChoices.reduce(( current, next ) => {
                return current && next.valid;
            }, true);
            return { ...state, formChoices: newFormChoices, allFormsValid: allValid };
        default:
            return state;
    }
}