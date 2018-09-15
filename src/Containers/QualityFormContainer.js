import {
    ratingUpdated,
    ratingTextFieldToggled
} from '../Actions';
import { connect } from 'react-redux';
import QualityForm from '../Components/QualityForm/QualityForm';

const mapStateToProps = ( state ) => {
    return {
        value: state.quality.value,
        editable: state.quality.editable
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        handleRatingUpdated: (rating) => {
            let rating = value;
            if(rating !== "") {
                rating = Math.max(Math.min(rating, 10),0);
            }
            dispatch(ratingUpdated(rating));
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