import {
    SUBSCRIPTION_SUBMIT_REQUEST,
    SUBSCRIPTION_SUBMIT_SUCCESS,
    SUBSCRIPTION_SUBMIT_FAILURE
} from './types';
import ClientService from '../Services/ClientService';


export const subscriptionSubmitRequest = () => {
    return {
        type: SUBSCRIPTION_SUBMIT_REQUEST
    }
}

// TODO: Figure how what the server will pass back
export const subscriptionSubmitSuccess = (subscriptionInfo) => {
    return {
        type: SUBSCRIPTION_SUBMIT_SUCCESS,
        payload: subscriptionInfo
    }
}

export const subscriptionSubmitFailure = (error) => {
    return {
        type: SUBSCRIPTION_SUBMIT_FAILURE,
        payload: error
    }
}

export const submitSubscription = () => {
    return ( dispatch ) => {
        dispatch( subscriptionSubmitRequest() );
        ClientService.submitSubscription( (subscriptionInfo) => {
            dispatch( subscriptionSubmitSuccess(subscriptionInfo) );
        }, (error) => {
            dispatch( subscriptionSubmitFailure(error) );
        })        
    }
}