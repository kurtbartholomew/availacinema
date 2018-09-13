import React from 'react';
import './notificationform.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons';
import { PANEL_STATE } from '../../Constants';
import validator from 'validator';
import { isValidNumber } from 'libphonenumber-js';

class NotificationForm extends React.Component {
    state = {
        contactOptions : {
            emailDaily: false,
            emailWeekly: false,
            textDaily: false,
            textWeekly: false,
        },
        contactPhone: {
            value: undefined,
            valid: false
        },
        contactEmail: {
            value: undefined,
            valid: false
        }
    }

    handlePanelUpdate(options, email, phone) {
        let valid = false;
        if(options["emailDaily"] || options["emailWeekly"]) {
            if(email.valid) {
                valid = true;
            } else {
                this.props.handlePanelStateChange(PANEL_STATE.INVALID);
                return; 
            }
        }
        if(options["textDaily"] || options["textWeekly"]) {
            if(phone.valid) {
                valid = true;
            } else {
                this.props.handlePanelStateChange(PANEL_STATE.INVALID);
                return;
            }
        }
        this.props.handlePanelStateChange(valid ? PANEL_STATE.VALID : PANEL_STATE.INVALID);
    }

    toggleOption(option) {
        const newOption = {};
        newOption[option] = !this.state.contactOptions[option];
        const newOptions = Object.assign({},this.state.contactOptions,newOption);
        this.setState({contactOptions: newOptions});
        this.handlePanelUpdate(newOptions,this.state.contactEmail,this.state.contactPhone);
    }

    handlePhoneChange(phone) {
        const isValid = isValidNumber(phone, 'US');
        const newPhone = Object.assign({},this.state.contactPhone,{value: phone,valid: isValid})
        this.setState({contactPhone: newPhone});
        // TODO: Changing input content doesn't change valid correctly
        this.handlePanelUpdate(this.state.contactOptions,this.state.contactEmail, newPhone);
    }

    handleEmailChange(email) {
        const isValid = validator.isEmail(email);
        const newEmail = Object.assign({},this.state.contactEmail,{value: email,valid: isValid});
        this.setState({contactEmail: newEmail});
        this.handlePanelUpdate(this.state.contactOptions,newEmail, this.state.contactPhone);
    }

    render() {

        const { textDaily, textWeekly, emailDaily, emailWeekly } = this.state.contactOptions;

        return (
            <div className="notification">
                <div className="notification__options">
                    <div className="notification__option notification__option--email">
                        <div className="notification__form">
                            <NotificationOption 
                                id="email__daily"
                                handleClick={() => {this.toggleOption("emailDaily")}}
                                option={emailDaily}
                                text={"Email Daily"}
                            />
                            <NotificationOption 
                                id="email__weekly"
                                handleClick={() => {this.toggleOption("emailWeekly")}}
                                option={emailWeekly}
                                text={"Email Weekly"}
                            />
                            {(emailDaily || emailWeekly) && 
                                <NotificationInput
                                    type="Email"
                                    value={this.state.contactEmail.value}
                                    valid={this.state.contactEmail.valid}
                                    onChange={(e)=>{
                                        this.handleEmailChange(e.target.value)}
                                    }
                                />
                            }
                        </div>
                    </div>
                    <div className="notification__option notification__option--text">
                        <div className="notification__form">
                            <NotificationOption 
                                id="text__daily"
                                handleClick={() => {this.toggleOption("textDaily")}}
                                option={textDaily}
                                text={"Text Daily"}
                            />
                            <NotificationOption 
                                id="text__weekly"
                                handleClick={() => {this.toggleOption("textWeekly")}}
                                option={textWeekly}
                                text={"Text Weekly"}
                            />
                            {(textDaily || textWeekly) &&
                                <NotificationInput
                                    type="Phone"
                                    value={this.state.contactPhone.value}
                                    valid={this.state.contactPhone.valid}
                                    onChange={(e)=>this.handlePhoneChange(e.target.value)}
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

class NotificationInput extends React.Component {

    render() {
        const { type, value, onChange, valid} = this.props;

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