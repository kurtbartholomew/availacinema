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

const PANEL_STATE = {
    UNTOUCHED: 0,
    IN_PROGRESS: 1,
    INVALID: 2,
    VALID: 3
};

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
        this.setState({formChoices: newForms});
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
            },
            {
                id: 1,
                category: 'quality',
                title: 'Quality Filters',
                tooltip: 'How highly rated should each movie be?',
                childForm: QualityForm,
                condition: PANEL_STATE.UNTOUCHED
            },
            {
                id: 2,
                category: 'notification',
                title: 'Notification Options',
                tooltip: 'How do you want to be notified?',
                childForm: NotificationForm,
                condition: PANEL_STATE.UNTOUCHED
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
                    >
                        {form.title}
                    </PanelTitle>
                    <PanelContent>
                        {React.createElement(form.childForm)}
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
        let iconType;
        switch(this.props.condition) {
            case(PANEL_STATE.VALID):
                iconType = faCheckCircle;
                break;
            case(PANEL_STATE.INVALID):
                iconType = faTimesCircle;
                break;
            case(PANEL_STATE.UNTOUCHED):
            case(PANEL_STATE.IN_PROGRESS):
                iconType = faCircle;
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
                <FontAwesomeIcon icon={iconType} className="progressicon" size="2x" />
                <div  data-tip={this.props.tooltip}  className="startform__title">
                    {this.props.children}
                </div>
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