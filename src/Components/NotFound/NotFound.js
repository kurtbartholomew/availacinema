import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './notfound.css';

class NotFound extends Component {
    render() {
        return (
            <div className="notfound">
                <h2>Sorry, this page can't be found</h2>
                <p>
                    Either use the back button or navigate back to the
                    <span> <Link to="/">main page</Link></span>.
                </p>
            </div>
        );
    }
}

export default NotFound;