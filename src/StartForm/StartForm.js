import React from 'react';
import './startform.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames';
import GenreForm from '../GenreForm/GenreForm';
import NotificationForm from '../NotificationForm/NotificationForm';
import QualityForm from '../QualityForm/QualityForm';
import ReactTooltip from 'react-tooltip';
import { PANEL_STATE } from '../constants';


class StartForm extends React.Component {

    handleOnClick = (idx, conditionId) => {
        if(this.state.activeIdx === idx) {
            idx = -1;
            this.setState({activeIdx: idx});
        } else {
            const formId = this.state.formChoices.findIndex((form)=>{return idx === form.id});
            const newForms = this.updatePanelState(formId, conditionId);
            this.setState({activeIdx: idx, formChoices: newForms});
        }
    }

    updatePanelState = (formId, conditionId) => {
        const formChoices = this.state.formChoices;
        const formChoice = formChoices[formId];
        const newForm = Object.assign({},formChoice,{condition: conditionId});
        const newForms = [...formChoices.slice(0,formId),
                          newForm,
                          ...formChoices.slice(formId+1,formChoices.length)] 
        return newForms;
    }

    handlePanelStateChange(formId, stateId){
        const newForms = this.updatePanelState(formId,stateId);
        let areAllFormsValid = true;
        for(let form of newForms) {
            if(form.condition !== PANEL_STATE.VALID) {
                areAllFormsValid = false;
                break;
            }
        }
        this.setState({formChoices: newForms});
        this.props.handleAllFormsValid(areAllFormsValid);
    }

    state = {
        activeIdx: 2,
        formChoices: [
            {
                id: 0,
                category: 'genre',
                title: 'Genre Filters',
                tooltip: 'What genres do you want to know about?',
                childForm: GenreForm,
                condition: PANEL_STATE.UNTOUCHED,
                invalidMessage: 'Please select at least one genre.'
            },
            {
                id: 1,
                category: 'quality',
                title: 'Quality Filters',
                tooltip: 'How highly rated should each movie be?',
                childForm: QualityForm,
                condition: PANEL_STATE.UNTOUCHED,
                invalidMessage: 'Please select a minimum rating.'
            },
            {
                id: 2,
                category: 'notification',
                title: 'Notification',
                tooltip: 'If a movie matches your filters, how often would you like to be notified?',
                childForm: NotificationForm,
                condition: PANEL_STATE.UNTOUCHED,
                invalidMessage: 'Please choose a way you can be notified.'
            }
        ]
    }

    render() {

        const {
            activeIdx,
            formChoices
        } = this.state;

        const panels = formChoices.map((form) => {
            return (
                <FormPanel
                    key={form.id}
                    id={form.id}
                    active={form.id === activeIdx}
                    category={form.category}
                    condition={form.condition}
                >
                    <PanelTitle
                        id={form.id}
                        condition={form.condition}
                        onClick={this.handleOnClick}
                        tooltip={form.tooltip}
                        invalidMessage={form.invalidMessage}
                    >
                        {form.title}
                    </PanelTitle>
                    <PanelContent>
                        {React.createElement(form.childForm,{
                                handlePanelStateChange: (conditionId) => {this.handlePanelStateChange(form.id,conditionId)}
                            }
                        )}
                    </PanelContent>
                </FormPanel>
            );
        });

        return (
            <ul className="startform__choices">
                {panels}
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
                className={classes}
            >
                {this.props.children}
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
            case(PANEL_STATE.IN_PROGRESS):
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
                    if(cond === PANEL_STATE.UNTOUCHED) {
                        cond = PANEL_STATE.IN_PROGRESS;
                    }
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