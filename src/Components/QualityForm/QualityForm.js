import React from 'react';
import './qualityform.css';

class QualityForm extends React.Component {
    render() {

        const {
            value,
            editable,
            handleRatingUpdated,
            handleRatingTextFieldToggled
        } = this.props;

        return (
            <div className="qualityform">
                <form className="qualityform__inputs">
                    <h2>Minimum Rating</h2>
                    <EditableTextInput 
                        editable={ editable }
                        handleInputChange={ (e) => { handleRatingUpdated(e.target.value); }}
                        handleLoseFocus={ handleRatingTextFieldToggled }
                        quality={ value }
                        handleRatingClick={ handleRatingTextFieldToggled }
                    />
                    <input 
                        onChange={ (e) => { handleRatingUpdated(e.target.value); }} 
                        min="0" 
                        max="10" 
                        step="0.1" 
                        value={ value } type="range"
                        className="qualityform__slider"
                    />
                </form>
            </div>
        )
    }
}

class EditableTextInput extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.editable ?
                    // TODO: Change this to component so I can use HOC click outside wrapper
                    <input
                        className="qualityform__rating-input"
                        onChange={ this.props.handleInputChange }
                        onBlur={ this.props.handleLoseFocus }
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={ this.props.quality }
                    /> :
                    <div
                        className="qualityform__rating-text"
                        onClick={ this.props.handleRatingClick }
                    >
                        { this.props.quality }
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default QualityForm;