import {
   toggleSelectedForm 
} from '../Actions';
import { connect } from 'react-redux';
import StartForm from '../Components/StartForm/StartForm';

const mapStateToProps = ( state ) => {
    return {
        activeIdx: state.start.activeIdx,
        formChoices: state.start.formChoices,
        isSubmitting: state.start.isSubmitting
    };
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        handleFormChoiceSelect: (formIdx) => {
            dispatch(toggleSelectedForm(formIdx));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartForm);