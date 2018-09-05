import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="navbar">
                    <div className="navbar__brand">
                        <div className="navbar__logo">O</div>
                        <div className="navbar__name">AvailaCinema</div>
                    </div>
                    <div className="navbar__options">
                        <div className="navbar__option option__login">Login</div>
                        <div className="navbar__option option__about">About</div>
                    </div>
                </div>
                <div className="main">
                    <div className="main__left">
                        <div className="main__description">
                            <div className="main__title">
                                Find out how to make good movies yours more quickly
                            </div>
                            <div className="main__blurb">
                                Availacinema notifies you when movies that measure up
                                to your standards are available to purchase.
                            </div>
                        </div>
                    </div>
                    <div className="main__right">
                        <div className="main__cta">
                            
                            <button className="main__start">
                                Find great movies!
                            </button>
                            <button className="main__login">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
