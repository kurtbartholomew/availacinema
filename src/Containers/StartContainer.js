import Start from '../Components/Start/Start';
import { subscriptionSubmitRequest } from '../Actions/'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        allFormsValid: state.start.allFormsValid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleOnSubmit: () => {
            dispatch(subscriptionSubmitRequest())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Start);