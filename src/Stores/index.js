import { createStore, applyMiddleware } from 'redux';
import reducers from '../Reducers';
import thunkMiddlware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger();

// TODO: Change how reducers are exported once app is expanded
const store = createStore (
    reducers,
    {},
    applyMiddleware(
        thunkMiddlware,
        logger
    )
);

export default store;