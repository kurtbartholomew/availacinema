import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import Nav from './Nav';

describe('Nav', () => {

    let nav;

    beforeEach(() => {
        nav = shallow(
            <Nav />
        );
    });

    it('should render properly',() => {
        expect(nav).toBeDefined();
    });
});