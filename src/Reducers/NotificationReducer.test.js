import NotificationReducer from './NotificationReducer';
import * as types from '../Actions/types';
import { CONTACT_OPTIONS } from '../Constants';

describe('Notification Reducer', () => {

    let startState;

    beforeEach(() => {
        startState = {
            contactOptions: {},
            contactPhone: {
                value: "",
                valid: false
            },
            contactEmail: {
                value: "",
                valid: false
            }
        }
        for( let option in CONTACT_OPTIONS ) {
            startState.contactOptions[option] = false;
        }
    });


    it('should return the initial state', () => {
        expect(NotificationReducer(undefined, {})).toEqual(
            startState
        );
    });

    it('should handle CONTACT_OPTION_TOGGLED action', () => {
        expect(NotificationReducer(startState, {
            type: types.CONTACT_OPTION_TOGGLED,
            payload: "EMAIL_DAILY"
        })).toEqual({
            contactOptions: {
                EMAIL_DAILY: true,
                EMAIL_WEEKLY: false,
                TEXT_DAILY: false,
                TEXT_WEEKLY: false
            },
            contactPhone: expect.any(Object),
            contactEmail: expect.any(Object)
        });
    });

    it('should handle CONTACT_EMAIL_UPDATED action', () => {
        expect(NotificationReducer(startState, {
            type: types.CONTACT_EMAIL_UPDATED,
            payload: {
                evalue: "jim@gmail.com",
                evalid: true
            }
        })).toEqual({
            contactOptions: expect.any(Object),
            contactPhone: expect.any(Object),
            contactEmail: {
                value: "jim@gmail.com",
                valid: true
            }
        });
    });

    it('should handle CONTACT_PHONE_UPDATED action', () => {
        expect(NotificationReducer(startState, {
            type: types.CONTACT_PHONE_UPDATED,
            payload: {
                pvalue: "7688675309",
                pvalid: true
            }
        })).toEqual({
            contactOptions: expect.any(Object),
            contactPhone: {
                value: "7688675309",
                valid: true
            },
            contactEmail: expect.any(Object)
        });
    });
});