import React from 'react';
import './start.css';
import StartForm from '../StartForm/StartForm';

class Start extends React.Component {
    render() {
        return (
            <div className="startform__container">
                <StartForm />
                <button className="startform__submit">Submit</button>
            </div>
        )
    }
}

export default Start;