import React from 'react';
import './notificationform.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons';

class NotificationForm extends React.Component {
    state = {
        emailDaily: false,
        emailWeekly: false,
        textDaily: false,
        textWeekly: false
    }

    toggleOption(option) {
        const newOption = {};
        newOption[option] = !this.state[option];
        this.setState(newOption);
    }

    render() {
        return (
            <div className="notification">
                <div className="notification__options">
                    <div className="notification__option notification__option--email">
                        <div className="notification__form">
                            <NotificationOption 
                                id="email__daily"
                                handleClick={() => {this.toggleOption("emailDaily")}}
                                option={this.state.emailDaily}
                                text={"Email Daily"}
                            />
                            <NotificationOption 
                                id="email__weekly"
                                handleClick={() => {this.toggleOption("emailWeekly")}}
                                option={this.state.emailWeekly}
                                text={"Email Weekly"}
                            />
                        </div>
                    </div>
                    <div className="notification__option notification__option--text">
                        <div className="notification__form">
                            <NotificationOption 
                                id="text__daily"
                                handleClick={() => {this.toggleOption("textDaily")}}
                                option={this.state.textDaily}
                                text={"Text Daily"}
                            />
                            <NotificationOption 
                                id="text__weekly"
                                handleClick={() => {this.toggleOption("textWeekly")}}
                                option={this.state.textWeekly}
                                text={"Text Weekly"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class NotificationOption extends React.Component {
    render() {
        const { handleClick, option, text } = this.props;

        return (
            <div className="notification__box" onClick={handleClick}>
                <FontAwesomeIcon 
                    icon={option ? faCheckSquare : faSquare}
                    size="2x"
                />
                <span className="notification__text">
                    {text}
                </span>
            </div>
        )
    }
}

export default NotificationForm;