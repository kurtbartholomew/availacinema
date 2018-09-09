import React from 'react';
import './startform.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import GenreForm from '../GenreForm/GenreForm';
import NotificationForm from '../NotificationForm/NotificationForm';
import QualityForm from '../QualityForm/QualityForm';

class StartForm extends React.Component {

    handleOnClick = (idx) => {
        console.log(idx);
        this.setState({activeIdx: idx});
    }

    state = {
        activeIdx: -1,
        formChoices: [
            {
                id: 0,
                category: 'genre',
                title: 'Genre Filters',
                childForm: GenreForm,
            },
            {
                id: 1,
                category: 'quality',
                title: 'Quality Filters',
                childForm: QualityForm,
            },
            {
                id: 2,
                category: 'notification',
                title: 'Notification Options',
                childForm: NotificationForm,
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
                    onClick={this.handleOnClick}
                >
                    <PanelTitle>
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
                onClick={() => this.props.onClick(this.props.id)} 
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
        if(this.props.valid) {
            iconType = faCheckCircle;
        } else if(this.props.started) {
            iconType = faTimesCircle;
        } else {
            iconType = faDirections;
        }

        return (
            <div className="startform__titlebox" >
                <FontAwesomeIcon icon={iconType} className="progressicon" size="2x" />
                <div className="startform__title">
                    {this.props.children}
                </div>
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