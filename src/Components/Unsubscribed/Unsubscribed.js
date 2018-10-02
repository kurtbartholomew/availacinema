import React, { Component } from 'react';
import './unsubscribed.css';


class Unsubscribed extends Component {
    render() {
        return (
            <div className="unsubscribed">
                <h2>Sorry to see you go!</h2>
                <p>
                    You've been unsubscribed from notifications about new movies.
                </p>
            </div>
        );
    }
}

export default Unsubscribed;