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

export const submitSubscription = (RouterProps) => {
    return ( dispatch, getState ) => {
        const state = getState();
        const genreFilters = extractGenreFilters(state.genres);
        const ratingFilter = extractRatingFilter(state.quality);
        const notifications = extractNotificationMethods(state.notifications);
        const payload = {
            filters: [...genreFilters, ratingFilter],
            ...notifications
        };
        dispatch( subscriptionSubmitRequest() );
        return ClientService.submitSubscription(payload, (subscriptionInfo) => {
            dispatch( subscriptionSubmitSuccess(subscriptionInfo) );
            RouterProps.history.push('/confirm');
        }, (error) => {
            dispatch( subscriptionSubmitFailure(error) );
        })        
    }
}

function extractGenreFilters (genreState) {
    const genreFilters = [];
    genreState.genreList.forEach((genre)=>{
        if(genre.selected && genre.selected === true) {
            genreFilters.push({
                type: 0,
                value: genre.id
            });
        }
    });
    return genreFilters;
}

function extractRatingFilter (ratingState) {
    return {
        type: 1,
        value: ratingState.value
    };
}

function extractNotificationMethods (notifications) {
    const {
        contactEmail,
        contactOptions,
        contactPhone
    } = notifications;
    const notificationChoices = {};
    if(contactPhone.value !== "") {
        notificationChoices['phone'] = {
            value: contactPhone.value,
            daily: contactOptions.TEXT_DAILY,
            weekly: contactOptions.TEXT_WEEKLY
        }
    }
    if(contactEmail.value !== "") {
        notificationChoices['email'] = {
            value: contactEmail.value,
            daily: contactOptions.EMAIL_DAILY,
            weekly: contactOptions.EMAIL_WEEKLY
        }
    }
    return notificationChoices;
}