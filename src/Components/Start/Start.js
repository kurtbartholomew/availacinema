import React from 'react';
import './start.css';
import StartForm from '../StartForm/StartForm';

class Start extends React.Component {
    state = {
        formsAllValid: false
    }
    handleAllFormsValid = (areValid) => {
        this.setState({formsAllValid: areValid});
    }

    // TODO: Refactor to Redux to contain state better
    handleOnSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div className="startform__container">
                <StartForm 
                    handleAllFormsValid={this.handleAllFormsValid}
                />
                <button type="submit" 
                    onSubmit={this.handleOnSubmit}
                    disabled={!this.state.formsAllValid}
                    className="startform__submit"
                >
                Submit</button>
            </div>
        )
    }
}

export default Start;