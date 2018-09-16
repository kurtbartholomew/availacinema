import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import Nav from '../Nav/Nav';
import Main from '../Main/Main';
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
                        <Route exact path="/" component={Main} />
                        <Route path="/start" component={StartContainer} />
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;