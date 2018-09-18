import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './GenreActions';
import * as types from './types';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Genre Form Actions', () => {

    it('should create an action to toggle a genre', () => {
        const genreId = 17;
        const expectedAction = {
            type: types.GENRE_TOGGLED,
            payload: genreId
        };
        expect(actions.genreToggled(genreId)).toEqual(expectedAction);
    });

    it('should create an action to select all genres', () => {
        const expectedAction = {
            type: types.ALL_GENRES_SELECTED
        };
        expect(actions.allGenresSelected()).toEqual(expectedAction);
    });

    it('should create an action to deselect all genres', () => {
        const expectedAction = {
            type: types.ALL_GENRES_DESELECTED
        };
        expect(actions.allGenresDeselected()).toEqual(expectedAction);
    });

    it('should create an action to signal the genre list was requested', () => {
        const expectedAction = {
            type: types.GENRES_LIST_REQUEST
        };
        expect(actions.genreListRequest()).toEqual(expectedAction);
    });

    it('should create an action to return a list of genre objects', () => {
        const genres = [
            {
                id: 5,
                name: 'Romance'
            }
        ];
        const expectedAction = {
            type: types.GENRES_LIST_SUCCESS,
            payload: [
                    {
                        id: 5,
                        name: 'Romance'
                    }
            ]
        };
        expect(actions.genreListSuccess(genres)).toEqual(expectedAction);
    });

    it('should create an action to signal genre list retrieval failed', () => {
        const error = new Error("Something screwed up");
        const expectedAction = {
            type: types.GENRES_LIST_FAILURE,
            payload: error
        };
        expect(actions.genreListFailure(error)).toEqual(expectedAction);
    });
});

describe('Async actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('creates GENRE_LIST_SUCCESS when fetching genres is finished', () => {
        fetchMock.getOnce('/api/genres', {
            genres: []
        });

        const expectedActions = [
            { type: types.GENRES_LIST_REQUEST },
            { type: types.GENRES_LIST_SUCCESS, payload: { genres: []} }
        ];

        const store = mockStore({
            genres: {
                genreList: []
            }
        });
        store.dispatch(actions.retrieveGenreList()).then(()=> {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates GENRE_LIST_FAILURE when fetching genres doesnt succeed', () => {
        fetchMock.getOnce('/api/genres', {
            throws: {
                error: new Error("bad stuff")
            }
        });

        const expectedActions = [
            { type: types.GENRES_LIST_REQUEST },
            { type: types.GENRES_LIST_FAILURE, payload: { error: new Error("bad stuff") } }
        ];

        const store = mockStore({
            genres: {
                genreList: []
            }
        });
        store.dispatch(actions.retrieveGenreList()).then(()=> {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});