import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import Unsubscribed from './Unsubscribed';

describe('Unsubscribed', () => {

    let unsubscribed;

    beforeEach(() => {
        unsubscribed = shallow(
            <Unsubscribed />
        );
    })

    it('should render properly', () => {
        expect(unsubscribed).toBeDefined();
    });
});