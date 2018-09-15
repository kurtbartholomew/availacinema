import {
    SUBSCRIPTION_SUBMIT_REQUEST,
    SUBSCRIPTION_SUBMIT_SUCCESS,
    SUBSCRIPTION_SUBMIT_FAILURE
} from './types';


export const subscriptionSubmitRequest = () => {
    return {
        type: SUBSCRIPTION_SUBMIT_REQUEST
    }
}

export const subscriptionSubmitSuccess = () => {
    return {
        type: SUBSCRIPTION_SUBMIT_SUCCESS
    }
}

export const subscriptionSubmitFailure = () => {
    return {
        type: SUBSCRIPTION_SUBMIT_FAILURE
    }
}