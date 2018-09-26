import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import Confirm from './Confirm';

describe('Confirm', () => {

    let confirm;

    beforeEach(() => {
        confirm = shallow(
            <Confirm />
        );
    })

    it('should render properly', () => {
        expect(confirm).toBeDefined();
    });
});