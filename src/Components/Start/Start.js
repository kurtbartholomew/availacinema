import React from 'react';
import './start.css';
import StartFormContainer from '../../Containers/StartFormContainer';

class Start extends React.Component {
    render() {

        const { handleOnSubmit, allFormsValid } = this.props;

        return (
            <div className="startform__container">
                <StartFormContainer />
                <button type="submit"
                    onSubmit={ handleOnSubmit }
                    disabled={ !allFormsValid }
                    className="startform__submit"
                >
                    Submit
                </button>
            </div>
        )
    }
}

export default Start;