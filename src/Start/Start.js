import React from 'react';
import './start.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

class Start extends React.Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps ) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        return (
            <div className="startform__container">
                <ul className="startform__choices">
                    <li className="startform__choice startform__genre">
                        <div className="startform__titlebox">
                            <FontAwesomeIcon icon={faDirections} className="progressicon" size="3x"/>
                            <div className="startform__title">Genre Filters</div>
                        </div>
                    </li>
                    <li className="startform__choice startform__quality">
                        <div className="startform__titlebox">
                            <FontAwesomeIcon icon={faDirections} className="progressicon"  size="3x"/>
                            <div className="startform__title">Quality Filters</div>
                        </div>
                    </li>
                    <li className="startform__choice startform__notification">
                        <div className="startform__titlebox">
                            <FontAwesomeIcon icon={faDirections} className="progressicon"  size="3x"/>
                            <div className="startform__title">Notification Options</div>
                        </div>
                    </li>
                    <li className="startform__choice startform__submit">
                        <div className="startform__titlebox">
                            <div className="startform__title"></div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Start;