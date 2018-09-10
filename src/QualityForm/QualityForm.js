import React from 'react';
import './qualityform.css';

class QualityForm extends React.Component {
    state = {
        quality: 5
    }

    handleClick(event) {
        this.setState(Object.assign({},this.state.quality,{quality: event.target.value}));
    }

    render() {
        return (
            <div className="qualityform">
                <form className="qualityform__inputs">
                    <h2>Minimum Rating</h2>
                    <div className="qualityform__rating">{this.state.quality}</div>
                    <input 
                        onChange={(e)=>{this.handleClick(e)}} 
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

export default QualityForm;