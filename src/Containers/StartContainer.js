import Start from '../Components/Start/Start';
import { connect } from 'react-redux';
import { submitSubscription } from '../Actions/StartActions';

const mapStateToProps = (state) => {
    return {
        allFormsValid: state.start.allFormsValid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleOnSubmit: () => {
            dispatch( submitSubscription() );
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Start);