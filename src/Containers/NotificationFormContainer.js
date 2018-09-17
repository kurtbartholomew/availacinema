import {
    contactOptionToggled,
    contactEmailUpdated,
    contactPhoneUpdated,
    changePanelState
} from '../Actions';
import NotificationForm from '../Components/NotificationForm/NotificationForm';
import { connect } from 'react-redux';
import validator from 'validator';
import { isValidNumber } from 'libphonenumber-js';
import { PANEL_STATE } from '../Constants';

const mapStateToProps = ( state ) => {
    return {
        contactOptions: state.notifications.contactOptions,
        contactPhone: state.notifications.contactPhone,
        contactEmail: state.notifications.contactEmail
    };
}

const mapDispatchToProps = ( dispatch ) => {
    const formId = 2;
    return {
        handleToggleNotifyOption: ( option ) => {
            dispatch( contactOptionToggled( option ) );
        },
        handlePhoneChange: ( phone ) => {
            // change eventually to support international numbers
            const isValid = isValidNumber( phone, 'US' );
            dispatch(contactPhoneUpdated({
                pvalue: phone,
                pvalid: isValid
            }));
            const newState = isValid ? PANEL_STATE.VALID : PANEL_STATE.INVALID;
            dispatch(changePanelState( formId, newState ));
        },
        handleEmailChange: ( email ) => {
            const isValid = validator.isEmail( email );
            dispatch(contactEmailUpdated({
                evalue: email,
                evalid: isValid
            }));
            const newState = isValid ? PANEL_STATE.VALID : PANEL_STATE.INVALID;
            dispatch(changePanelState( formId, newState ));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationForm);