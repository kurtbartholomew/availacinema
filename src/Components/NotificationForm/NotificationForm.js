import React from 'react';
import './notificationform.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons';

class NotificationForm extends React.Component {
    render() {

        const {
            EMAIL_DAILY,
            EMAIL_WEEKLY,
            TEXT_DAILY,
            TEXT_WEEKLY,
            handleToggleNotifyOption,
            handlePhoneChange,
            handleEmailChange,
            contactEmail,
            contactPhone
        } = this.props;

        return (
            <div className="notification">
                <div className="notification__options">
                    <div className="notification__option notification__option--email">
                        <div className="notification__form">
                            <NotificationOption 
                                handleToggleOption={handleToggleNotifyOption}
                                option={"EMAIL_DAILY"}
                                text={"Email Daily"}
                                isSelected={EMAIL_DAILY}
                            />
                            <NotificationOption 
                                handleToggleOption={handleToggleNotifyOption}
                                option={"EMAIL_WEEKLY"}
                                text={"Email Weekly"}
                                isSelected={EMAIL_WEEKLY}
                            />
                            {(EMAIL_DAILY || EMAIL_WEEKLY) && 
                                <NotificationInput
                                    type="Email"
                                    value={contactEmail.value}
                                    valid={contactEmail.valid}
                                    onChange={ (e) => {
                                            handleEmailChange(e.target.value)
                                        }
                                    }
                                />
                            }
                        </div>
                    </div>
                    <div className="notification__option notification__option--text">
                        <div className="notification__form">
                            <NotificationOption 
                                handleToggleOption={handleToggleNotifyOption}
                                option={"TEXT_DAILY"}
                                text={"Text Daily"}
                                isSelected={TEXT_DAILY}
                            />
                            <NotificationOption 
                                handleToggleOption={handleToggleNotifyOption}
                                option={"TEXT_WEEKLY"}
                                text={"Text Weekly"}
                                isSelected={TEXT_WEEKLY}
                            />
                            {(TEXT_DAILY || TEXT_WEEKLY) &&
                                <NotificationInput
                                    type="Phone"
                                    value={contactPhone.value}
                                    valid={contactPhone.valid}
                                    onChange={ (e) => {
                                            handlePhoneChange(e.target.value)
                                        }
                                    }
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class NotificationOption extends React.Component {
    render() {
        const { handleToggleOption, option, isSelected, text } = this.props;

        return (
            <div
                className="notification__box"
                onClick={ () => { handleToggleOption(option) }}
            >
                <FontAwesomeIcon 
                    icon={isSelected ? faCheckSquare : faSquare}
                    size="2x"
                />
                <span className="notification__text">
                    {text}
                </span>
            </div>
        )
    }
}

class NotificationInput extends React.Component {

    render() {
        const { type, value, onChange, valid } = this.props;

        return (
            <React.Fragment>
                <label htmlFor={`notification__${type}`}>
                    {`${type}: `}
                    <input 
                        className="notification__contact"
                        type={type === 'Phone' ? 'tel' : 'email'}
                        id={`notification__${type}`}
                        placeholder={`${type} here...`}
                        value={value}
                        onChange={onChange}
                    />
                    
                    <FontAwesomeIcon
                        className={`notification__contact--${!valid ? "in" : ""}valid`}
                        icon={valid ? faCheck : faTimes}
                        color={valid ? "green" : "red"}
                    />
                </label>
            </React.Fragment>
        );
    }
}

export default NotificationForm;