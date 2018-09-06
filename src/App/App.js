import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from '../Nav/Nav';
import Main from '../Main/Main';
import Signup from '../Signup/Signup';
import './app.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Nav />
                    <Route exact path="/" component={Main} />
                    <Route path="/start" component={Signup} />
                </div>
            </Router>
        )
    }
}

export default App;