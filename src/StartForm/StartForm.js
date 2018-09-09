import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

class StartForm extends React.Component {
    state = {
        activeIndex: 0,
        genreFormValid: false,
        qualityFormValid: false,
        notificationFormValid: false,
        showSubmissionPanel: false
    }

    render() {

        const {
            activeIndex,
            genresValid,
            genresStarted,
            qualityValid,
            qualityStarted,
            notificationValid,
            notificationStarted,
            showSubmissionPanel
        } = this.props;

        return (
            <ul className="startform__choices">
                <FormPanel 
                    active={activeIndex == 0}
                    category='genre'
                >
                    <PanelTitle 
                        valid={genresValid}
                        started={genresStarted}
                    >
                        Genre Filters
                    </PanelTitle>    
                    <PanelContent active={activeIndex == 0}>
                        <GenreForm />
                    </PanelContent>
                </FormPanel>        
                <FormPanel
                    active={activeIndex == 1}
                    category='quality'
                >
                    <PanelTitle 
                        valid={qualityValid}
                        started={qualityStarted}
                    >
                        Quality Filters
                    </PanelTitle>    
                    <PanelContent active={activeIndex == 1}>
                        <QualityForm />
                    </PanelContent>
                </FormPanel>    
                <FormPanel
                    active={activeIndex == 2}
                    category='notification'
                >
                    <PanelTitle
                        valid={notificationValid}
                        started={notificationStarted}
                    >
                        Notification Options
                    </PanelTitle>    
                    <PanelContent active={activeIndex == 2}>
                        <NotificationForm />
                    </PanelContent>
                </FormPanel>    
                <FormPanel
                    active={activeIndex == 3}
                    category='submit'
                >
                    <PanelTitle
                        started={false}
                    >
                        Submit
                    </PanelTitle>    
                    <PanelContent  active={activeIndex == 3}>
                        <SubmitForm />
                    </PanelContent>
                </FormPanel>    
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
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
}

class PanelTitle extends React.Component {
    render() {
        let iconType;
        if(this.state.valid) {
            iconType = faCheckCircle;
        } else if(this.state.started) {
            iconType = faTimesCircle;
        } else {
            iconType = faDirections;
        }

        return (
            <div className="startform__titlebox" >
                <FontAwesomeIcon icon={iconType} className="progressicon" />
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
            <div className="startform">
                {this.props.children}
            </div>
        );
    }
}
export default StartForm;