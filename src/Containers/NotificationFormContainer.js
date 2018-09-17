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
                value: phone,
                valid: isValid
            }));
        },
        handleEmailChange: ( email ) => {
            const isValid = validator.isEmail( email );
            dispatch(contactEmailUpdated({
                value: email,
                valid: isValid
            }));
            if( isValid ) {
                dispatch(changePanelState( formId, PANEL_STATE.VALID ));
            }
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationForm);