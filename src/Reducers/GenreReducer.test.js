import GenreReducer from './GenreReducer';
import * as types from '../Actions/types';

describe('Genres Reducer', () => {

    let startState;

    beforeEach(() => {
        startState = {
            isFetching: false,
            genreList: [
                {
                    id: 2,
                    name: "Western",
                    selected: false
                },
                {
                    id: 7,
                    name: "Comedy",
                    selected: true
                }
            ]
        }
    });
    
    it('should return the initial state', () => {
        expect(GenreReducer(undefined, {})).toEqual(
            {
                isFetching: false,
                genreList : []
            }
        );
    });

    it('should handle GENRE_TOGGLED', () => {
        expect(
            GenreReducer(startState, { 
                type: types.GENRE_TOGGLED,
                payload: 7
            })
        ).toEqual(
            {
                isFetching: false,
                genreList: [
                    {
                        id: 2,
                        name: "Western",
                        selected: false
                    },
                    {
                        id: 7,
                        name: "Comedy",
                        selected: false
                    }
                ]
            }
        );
    });

    it('should handle ALL_GENRES_SELECTED', () => {
        expect(
            GenreReducer(startState, { 
                type: types.ALL_GENRES_SELECTED
            })
        ).toEqual(
            {
                isFetching: false,
                genreList: [
                    {
                        id: 2,
                        name: "Western",
                        selected: true
                    },
                    {
                        id: 7,
                        name: "Comedy",
                        selected: true
                    }
                ]
            }
        );
    }); 

    it('should handle ALL_GENRES_DESELECTED', () => {
        expect(
            GenreReducer(startState, { 
                type: types.ALL_GENRES_DESELECTED
            })
        ).toEqual(
            {
                isFetching: false,
                genreList: [
                    {
                        id: 2,
                        name: "Western",
                        selected: false
                    },
                    {
                        id: 7,
                        name: "Comedy",
                        selected: false
                    }
                ]
            }
        );
    });

    it('should handle GENRES_LIST_REQUEST', () => {
        expect(
            GenreReducer(startState, { 
                type: types.GENRES_LIST_REQUEST
            })
        ).toEqual(
            {
                isFetching: true,
                genreList: [
                    {
                        id: 2,
                        name: "Western",
                        selected: false
                    },
                    {
                        id: 7,
                        name: "Comedy",
                        selected: true
                    }
                ]
            }
        );
    });

    it('should handle GENRES_LIST_SUCCESS', () => {
        expect(
            GenreReducer({
                isFetching: true,
                genreList: []
            }, { 
                type: types.GENRES_LIST_SUCCESS,
                payload: [
                    {
                        id: 2,
                        name: "Western",
                        selected: false
                    }
                ]
            })
        ).toEqual(
            {
                isFetching: false,
                genreList: [
                    {
                        id: 2,
                        name: "Western",
                        selected: false
                    }
                ]
            }
        );
    });

    it('should handle GENRES_LIST_FAILURE', () => {
        expect(
            GenreReducer(startState, { 
                type: types.GENRES_LIST_FAILURE
            })
        ).toEqual(
            {
                isFetching: false,
                genreList: [
                    {
                        id: 2,
                        name: "Western",
                        selected: false
                    },
                    {
                        id: 7,
                        name: "Comedy",
                        selected: true
                    }
                ]
            }
        );
    });

});