import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import Start from './Start';

describe('Start', () => {

    let start;

    beforeEach(() => {
        start = shallow(
            <Start />
        );
    });

    it.skip('should render properly',() => {
        expect(start).toBeDefined();
    });
});