import { createStore } from 'redux';
import reducers from '../Reducers';

// TODO: Change how reducers are exported once app is expanded
const store = createStore (
    reducers,
    {}
);

export default store;