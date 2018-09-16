import React from 'react';
import './notificationform.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons';
import { CONTACT_OPTIONS} from '../../Constants';

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
                                option={CONTACT_OPTIONS.EMAIL_DAILY}
                                isSelected={EMAIL_DAILY}
                            />
                            <NotificationOption 
                                handleToggleOption={handleToggleNotifyOption}
                                option={CONTACT_OPTIONS.EMAIL_WEEKLY}
                                isSelected={EMAIL_WEEKLY}
                            />
                            {(EMAIL_WEEKLY || EMAIL_WEEKLY) && 
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
                                option={CONTACT_OPTIONS.TEXT_DAILY}
                                isSelected={TEXT_DAILY}
                            />
                            <NotificationOption 
                                handleToggleOption={handleToggleNotifyOption}
                                option={CONTACT_OPTIONS.TEXT_WEEKLY}
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
        const { handleToggleOption, option, isSelected } = this.props;

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
                    {option}
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