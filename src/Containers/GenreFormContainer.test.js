// Since action methods interact with store,
// container tests are extended boilerplate

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { INITIAL_STATE } from '../Reducers/GenreReducer';
import GenreFormContainer from '../Containers/GenreFormContainer';
import thunk from 'redux-thunk';

// Enzyme required boilerplate
Enzyme.configure({ adapter: new Adapter() });

const shallowRenderWithStore = (component, store) => {
    const context = {
        store
    };
    return shallow(component, { context });
}

// Redux mock store boilerplate
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testState = {
    genres: INITIAL_STATE
}

describe('GenreFormContainer', () => {
    it.skip('should render correctly', () => {
        const store = mockStore(testState);
        const component = shallowRenderWithStore(
            <GenreFormContainer />,
            store
        )
        expect(component).toBeDefined();
    });
})
