import {
    GENRE_TOGGLED,
    ALL_GENRES_SELECTED,
    ALL_GENRES_DESELECTED,
    GENRES_LIST_REQUEST,
    GENRES_LIST_SUCCESS,
    GENRES_LIST_FAILURE
} from './types';

import ClientService from '../Services/ClientService';

export const genreToggled = (genreId) => {
    return {
        type: GENRE_TOGGLED,
        payload: genreId
    };
}

export const allGenresSelected = () => {
    return {
        type: ALL_GENRES_SELECTED
    }
}

export const allGenresDeselected = () => {
    return {
        type: ALL_GENRES_DESELECTED
    }
}

export const genreListRequest = () => {
    return ( dispatch ) => {
        dispatch( GENRES_LIST_REQUEST );
        return ClientService.getGenres((genres)=>{
            dispatch( GENRES_LIST_SUCCESS, genres );
        }, (error)=>{
            dispatch( GENRES_LIST_FAILURE, error );
        });
    }
}