import React from 'react';
import './startform.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { PANEL_STATE } from '../../Constants';


class StartForm extends React.Component {
    render() {

        const {
            activeIdx,
            formChoices,
            handleFormChoiceSelect,
            isSubmitting
        } = this.props;

        const panels = formChoices.map((form) => {
            return (
                <FormPanel
                    key={ form.id }
                    id={ form.id }
                    active={ form.id === activeIdx }
                    category={ form.category }
                    condition={ form.condition }
                >
                    <PanelTitle
                        id={ form.id }
                        condition={ form.condition }
                        onClick={ handleFormChoiceSelect }
                        tooltip={ form.tooltip }
                        invalidMessage={ form.invalidMessage }
                    >
                        { form.title }
                    </PanelTitle>
                    <PanelContent>
                        { React.createElement(form.childForm) }
                    </PanelContent>
                </FormPanel>
            );
        });

        return (
            <ul className={`startform__choices${isSubmitting ? " startform--submitting": ""}`}>
                { panels }
                { isSubmitting && 
                    <div className="startform__overlay"></div>
                }
            </ul>
        );
    }
}

class FormPanel extends React.Component {
    render() {

        const classes = classNames({
            "startform__choice": true,
            "startform__choice--active": this.props.active,
            [`startform__${this.props.category}`]: true
        });

        return (
            <div
                className={ classes }
            >
                { this.props.children }
            </div>
        );
    }
}

class PanelTitle extends React.Component {
    render() {
        let iconType, iconColor;
        switch(this.props.condition) {
            case(PANEL_STATE.VALID):
                iconType = faCheckCircle;
                iconColor = "green";
                break;
            case(PANEL_STATE.INVALID):
                iconType = faTimesCircle;
                iconColor = "red";
                break;
            case(PANEL_STATE.UNTOUCHED):
                iconType = faCircle;
                iconColor = "black";
                break;
            default:
                break;
        }

        return (
            <div className="startform__titlebox"
                onClick={() => {
                    let cond = this.props.condition;
                    this.props.onClick(this.props.id, cond);
                }}
            >
                <FontAwesomeIcon icon={iconType}
                    className="progressicon"
                    size="2x"
                    color={iconColor}
                />
                <div  data-tip={this.props.tooltip}  className="startform__title">
                    {this.props.children}
                </div>
                {this.props.condition === PANEL_STATE.INVALID && 
                        <span className="startform__err">{this.props.invalidMessage}</span>
                    }
                <ReactTooltip className="tooltip" effect="solid" place="right" />
            </div>
        );
    }
}

class PanelContent extends React.Component {
    render() {
        return (
            <div className="startform__content">
                {this.props.children}
            </div>
        );
    }
}
export default StartForm;