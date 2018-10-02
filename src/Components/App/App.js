import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Nav from '../Nav/Nav';
import Main from '../Main/Main';
import Confirm from '../Confirm/Confirm';
import Verified from '../Verified/Verified';
import NotFound from '../NotFound/NotFound';
import StartContainer from '../../Containers/StartContainer';
import store from '../../Stores';
import './app.css';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="container">
                        <Nav />
                        <Switch>
                            <Route exact path="/" component={Main} />
                            <Route exact path="/start" component={StartContainer} />
                            <Route exact path="/confirm" component={Confirm} />
                            <Route exact path="/verified" component={Verified} />
                            <Route exact path="/unsubscribed" component={Unsubscribed} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;