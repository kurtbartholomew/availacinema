import React from 'react';
import './qualityform.css';

class QualityForm extends React.Component {
    state = {
        quality: 5,
        editable: false
    }

    handleSliderChange(event) {
        this.setState(Object.assign({},this.state,{
            quality: event.target.value,
            editable: false
        }));
    }

    handleRatingClick() {
        this.setState(Object.assign({},this.state,{editable: true}));
    }

    handleInputChange(event) {
        let rating = event.target.value;
        if(rating !== "") {
            rating = Math.max(Math.min(rating, 10),0);
        }
        this.setState(Object.assign({},this.state,{quality: rating})); 
    }

    handleLoseFocus() {
        this.setState(Object.assign({},this.state,{editable: false})); 
    }

    render() {
        return (
            <div className="qualityform">
                <form className="qualityform__inputs">
                    <h2>Minimum Rating</h2>
                    <EditableTextInput 
                        editable={this.state.editable}
                        handleInputChange={(e)=>{this.handleInputChange(e)}}
                        handleLoseFocus={()=>this.handleLoseFocus()}
                        quality={this.state.quality}
                        handleRatingClick={()=>{this.handleRatingClick()}}
                    />
                    <input 
                        onChange={(e)=>{this.handleSliderChange(e)}} 
                        min="0" 
                        max="10" 
                        step="0.1" 
                        value={this.state.quality} type="range"
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
                        onChange={this.props.handleInputChange}
                        onBlur={this.props.handleLoseFocus}
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={this.props.quality}
                    /> :
                    <div
                        className="qualityform__rating-text"
                        onClick={this.props.handleRatingClick}
                    >
                        {this.props.quality}
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default QualityForm;