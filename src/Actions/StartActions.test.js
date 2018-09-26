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

    it.skip('creates SUBSCRIPTION_SUBMIT_SUCCESS when finished creating submission', () => {
        fetchMock.putOnce('/api/user', { 
            body: { success: true },
            headers: { 'content-type': 'application/json' }
        });

        const expectedActions = [
            { type: types.SUBSCRIPTION_SUBMIT_REQUEST },
            { type: types.SUBSCRIPTION_SUBMIT_SUCCESS, body: { success: true } }
        ];

        const store = mockStore({ start: {} });

        return store.dispatch(actions.submitSubscription()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});