import React, { Component } from 'react';
import './confirm.css';


class Confirm extends Component {
    render() {
        return (
            <div className="confirm">
                <div className="confirm__cta">
                    <h2>Thank you for subscribing!</h2>
                    <p>
                        In order to begin receiving notifications about movies,
                        you'll need to confirm your contact information.
                    </p>
                    <p>
                        Please check your email for an email from <b> admin@availacinema.com </b>
                         and follow the link to confirm.    
                    </p> 
                </div>
            </div>
        );
    }
}


export default Confirm;