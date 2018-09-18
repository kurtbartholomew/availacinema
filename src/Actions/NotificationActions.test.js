import * as actions from './NotificationActions';
import * as types from './types';

describe('Notification Form Actions', () => {

    it('should create an action to toggle a contact option', () => {
        const optionName = 'EMAIL_WEEKLY';
        const expectedAction = {
            type: types.CONTACT_OPTION_TOGGLED,
            payload: optionName
        };
        expect(actions.contactOptionToggled(optionName)).toEqual(expectedAction);
    });

    it('should create an action to update contact email', () => {
        const emailAndValidPayload = {
            value: "jim@gmail.com",
            valid: true
        }
        const expectedAction = {
            type: types.CONTACT_EMAIL_UPDATED,
            payload: emailAndValidPayload
        };
        expect(actions.contactEmailUpdated(emailAndValidPayload)).toEqual(expectedAction);
    });

    it('should create an action to update contact phone number', () => {
        const phoneAndValidPayload = {
            value: "7563428213",
            valid: true
        }
        const expectedAction = {
            type: types.CONTACT_PHONE_UPDATED,
            payload: phoneAndValidPayload
        };
        expect(actions.contactPhoneUpdated(phoneAndValidPayload)).toEqual(expectedAction);
    });
});