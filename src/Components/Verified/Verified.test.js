import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import Verified from './Verified';

describe('Verified', () => {

    let verified;

    beforeEach(() => {
        verified = shallow(
            <Verified />
        );
    })

    it('should render properly', () => {
        expect(verified).toBeDefined();
    });
});