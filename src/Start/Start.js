import React from 'react';
import './start.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import StartForm from '../StartForm/StartForm';

class Start extends React.Component {
    render() {
        return (
            <div className="startform__container">
                <StartForm />
            </div>
        )
    }
}

export default Start;