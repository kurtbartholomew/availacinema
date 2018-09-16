import {
    GENRE_TOGGLED,
    ALL_GENRES_SELECTED,
    ALL_GENRES_DESELECTED,
    GENRES_LIST_REQUEST,
    GENRES_LIST_SUCCESS,
    GENRES_LIST_FAILURE
} from '../Actions/types';

const INITIAL_STATE = {
    isFetching: false,
    genreList : []
};

export default ( state = INITIAL_STATE, action ) => {
    let newGenreList;
    switch(action.type) {
        case GENRE_TOGGLED:
            const genreId = state.genreList.findIndex((genre) => genre.id === action.payload);
            const oldGenre = state.genreList[genreId];
            const newGenre = Object.assign({}, oldGenre, {selected: !oldGenre.selected});
            newGenreList = [...state.genreList.slice(genreId),
                                  newGenre,
                                  ...state.genreList.slice(genreId+1)
            ];
            return { ...state, genreList: newGenreList};

        case ALL_GENRES_SELECTED:
            newGenreList = state.genreList.map(( genre )=> {
                const newGenre = Object.assign({}, genre, { selected: true });
                return newGenre;
            });
            return { ...state, genreList: newGenreList};

        case ALL_GENRES_DESELECTED:
            newGenreList = state.genreList.map(( genre )=> {
                const newGenre = Object.assign({}, genre, { selected: false });
                return newGenre;
            });
            return { ...state, genreList: newGenreList};

        case GENRES_LIST_REQUEST:
            return { ...state, isFetching: true };

        case GENRES_LIST_SUCCESS:
            return { ...state, genreList: action.payload, isFetching: false };

        // TODO: Deal with failure
        case GENRES_LIST_FAILURE:
            return { ...state, isFetching: false };

        default:
            return state;
    }
}

// const INITIAL_GENRE_STATE = {
//     id: -1,
//     name: "",
//     selected: false
// };

// const GenreReducer = ( genre = INITIAL_GENRE_STATE, action ) => {
//     switch(action.type) {
//         case GENRE_TOGGLED:
//             const newGenre = Object.assign({}, ...genre, { selected: true });
//             return Object.assign({}, ...genre, { selected: true });
//         default:
//             return genre;
//     }
// }