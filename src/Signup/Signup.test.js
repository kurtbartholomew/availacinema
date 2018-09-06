import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import Signup from './Signup';

describe('Signup', () => {

    let signup;

    beforeEach(() => {
        signup = shallow(
            <Signup />
        );
    });

    it('should render properly',() => {
        expect(signup).toBeDefined();
    });
});