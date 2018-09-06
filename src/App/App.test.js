import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import App from './App';


describe('App', () => {

    let app;

    beforeEach(() => {
        app = shallow(
            <App />
        );
    })

    it('should render properly',() => {
        expect(app).toBeDefined();
    })
})