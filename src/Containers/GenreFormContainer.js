import {
    genreToggled,
    allGenresSelected,
    allGenresDeselected,
    changePanelState,
    retrieveGenreList
} from '../Actions';
import { connect } from 'react-redux';
import GenreForm from '../Components/GenreForm/GenreForm';
import { PANEL_STATE } from '../Constants';


export const mapStateToProps = ( state ) => {
    return {
        isFetching: state.genres.isFetching,
        genreList: state.genres.genreList
    }
}

export const mapDispatchToProps = ( dispatch ) => {
    const formId = 0; // hardcoded id from startReducer's formChoices
    return {
        handleGenreToggle: (genreId) => {
            dispatch( genreToggled(genreId) );
        },
        handleAllGenresSelected: () => {
            dispatch( allGenresSelected() );
            dispatch( changePanelState(formId, PANEL_STATE.VALID));
        },
        handleAllGenresDeselected: () => {
            dispatch( allGenresDeselected() );
            dispatch( changePanelState(formId, PANEL_STATE.INVALID));
        },
        handlePanelStateChange: (panelState) => {
            dispatch( changePanelState(formId, panelState) );
        },
        loadGenres: () => {
            dispatch( retrieveGenreList() )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GenreForm);