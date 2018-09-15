import {
    genreToggled,
    allGenresSelected,
    allGenresDeselected
} from '../Actions';
import { connect } from 'react-redux';
import GenreForm from '../Components/GenreForm/GenreForm';


export const mapStateToProps = ( state ) => {
    return {
        isFetching: state.genres.isFetching,
        genreList: state.genreList
    }
}

export const mapDispatchToProps = ( dispatch ) => {
    return {
        handleGenreToggle: (genreId) => {
            dispatch(genreToggled(genreId));
        },
        handleAllGenresSelected: () => {
            dispatch(allGenresSelected());
        },
        handleAllGenresDeselected: () => {
            dispatch(allGenresDeselected());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GenreForm);