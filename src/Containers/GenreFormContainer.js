import {
    genreToggled,
    allGenresSelected,
    allGenresDeselected,
    changePanelState
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
    return {
        handleGenreToggle: (genreId) => {
            dispatch( genreToggled(genreId) );
        },
        handleAllGenresSelected: () => {
            dispatch( allGenresSelected() );
            dispatch( changePanelState(PANEL_STATE.VALID));
        },
        handleAllGenresDeselected: () => {
            dispatch( allGenresDeselected() );
            dispatch( changePanelState(PANEL_STATE.INVALID));
        },
        handlePanelStateChange: (panelState) => {
            dispatch( changePanelState(panelState) );
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GenreForm);