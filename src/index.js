import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from './Nav/Nav';
import Main from './Main/Main';
import Signup from './Signup/Signup';
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

ReactDOM.render(<App />, document.getElementById('root'));
