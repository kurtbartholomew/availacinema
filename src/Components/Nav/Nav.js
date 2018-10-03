import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

class Nav extends React.Component {
    render() {
        return (
            <div className="navbar">
                <Link className="navbar__brand" to={"/"}>
                    <div className="navbar__logo"></div>
                    <div className="navbar__name">AvailaCinema</div>
                </Link>
                <div className="navbar__options">
                    {/* <Link to={"/login"} className="navbar__option option__login">Login</Link> */}
                    {/* <Link to={"/about"}  className="navbar__option option__about">About</Link> */}
                    {/* <Link to={"/contact"}  className="navbar__option option__contact">Contact</Link> */}
                </div>
            </div>
        );
    }
}

export default Nav;