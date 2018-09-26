import React from 'react';
import './start.css';
import StartFormContainer from '../../Containers/StartFormContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class Start extends React.Component {
    render() {

        const { 
            handleOnSubmit,
             allFormsValid,
             isSubmitting
        } = this.props;

        return (
            <div className="startform__container">
                <StartFormContainer />
                <button type="submit"
                    onClick={ handleOnSubmit }
                    disabled={ !allFormsValid  || isSubmitting}
                    className="startform__submit"
                >
                    {isSubmitting && 
                        <FontAwesomeIcon className="startform__submitting-icon" size="2x" icon={faSpinner} spin={true}/>
                    }
                    Submit
                </button>
            </div>
        )
    }
}

export default Start;