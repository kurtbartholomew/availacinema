import React from 'react';

class Nav extends React.Component {
    render() {
        return (
            <div className="navbar">
                <div className="navbar__brand">
                    <div className="navbar__logo"></div>
                    <div className="navbar__name">AvailaCinema</div>
                </div>
                <div className="navbar__options">
                    <div className="navbar__option option__login">Login</div>
                    <div className="navbar__option option__about">About</div>
                    <div className="navbar__option option__contact">Contact</div>
                </div>
            </div>
        );
    }
}

export default Nav;