import {
    ratingUpdated,
    ratingTextFieldToggled,
    changePanelState
} from '../Actions';
import { connect } from 'react-redux';
import QualityForm from '../Components/QualityForm/QualityForm';
import { PANEL_STATE } from '../Constants';

const mapStateToProps = ( state ) => {
    return {
        value: state.quality.value,
        editable: state.quality.editable
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        handleRatingUpdated: (rating) => {
            if(rating !== "") {
                rating = Math.max(Math.min(rating, 10),0);
            }
            dispatch(ratingUpdated(rating));
            dispatch( changePanelState(PANEL_STATE.VALID) );
        },
        handleRatingTextFieldToggled: () => {
            dispatch(ratingTextFieldToggled());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QualityForm);