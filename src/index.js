import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Nav from './Nav/Nav';
import Main from './Main/Main';
class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Nav />
                    <Main />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
