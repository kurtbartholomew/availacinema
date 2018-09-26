import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './StartActions';
import * as types from './types';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Start Actions', () => {

    it('should create an action to signal the genre list was requested', () => {
        const expectedAction = {
            type: types.SUBSCRIPTION_SUBMIT_REQUEST
        };
        expect(actions.subscriptionSubmitRequest()).toEqual(expectedAction);
    });

    it('should create an action to return subscription info on submission success', () => {
        const subscriptionInfo = {
            success: true
        }
        const expectedAction = {
            type: types.SUBSCRIPTION_SUBMIT_SUCCESS,
            payload: subscriptionInfo
        };
        expect(actions.subscriptionSubmitSuccess(subscriptionInfo)).toEqual(expectedAction);
    });

    it('should create an action to signal subscription submission failed', () => {
        const error = new Error("Unable to subscribe: Failed to contact network");
        const expectedAction = {
            type: types.SUBSCRIPTION_SUBMIT_FAILURE,
            payload: error
        };
        expect(actions.subscriptionSubmitFailure(error)).toEqual(expectedAction);
    });
});

describe('Async actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('creates SUBSCRIPTION_SUBMIT_SUCCESS when finished creating submission', () => {
        fetchMock.postOnce('/api/user', { 
            body: { success: true },
            headers: { 'content-type': 'application/json' }
        });

        const expectedActions = [
            { type: types.SUBSCRIPTION_SUBMIT_REQUEST },
            { type: types.SUBSCRIPTION_SUBMIT_SUCCESS, payload: { success: true } }
        ];

        const store = mockStore({
            notifications: {
                contactOptions: {
                    EMAIL_DAILY: true,
                    EMAIL_WEEKLY: false,
                    TEXT_DAILY: false,
                    TEXT_WEEKLY: true
                },
                contactPhone: {
                    value: "5555555555",
                    valid: true
                },
                contactEmail: {
                    value: "",
                    valid: false
                }
            },
            quality : {
                selected: true,
                value: 5.6,
                editable: false
            },
            genres: {
                genreList: [
                    {
                        id: 12,
                        name: "Adventure",
                        selected: true
                    },
                    {
                        id: 14,
                        name: "Fantasy",
                        selected: true
                    },
                    {
                        id: 878,
                        name: "Science Fiction"
                    }
                ]
            }
        });

        var routerMock = {
            history: {
                push(str) {
                    return true;
                }
            }
        };

        return store.dispatch(actions.submitSubscription(routerMock)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});