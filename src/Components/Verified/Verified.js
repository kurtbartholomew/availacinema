import React, { Component } from 'react';
import './verified.css';


class Verified extends Component {
    render() {
        return (
            <div className="verified">
                <h2>Thanks for verifying your contact details!</h2>
                <p>
                    You should now start receiving notifications about movies
                    matching the filters you've chosen.
                </p>
                <p>
                    If you'd like to stop receiving notifications, please
                    click the unsuscribe link accompanying any email sent to
                    you by AvailaCinema.
                </p> 
                <p>Thanks and have a wonderful day!</p>
            </div>
        );
    }
}

export default Verified;