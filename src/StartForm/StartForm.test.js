import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import StartForm from './StartForm';

describe('Start', () => {

    let startform;

    beforeEach(() => {
        startform = shallow(
            <StartForm />
        );
    });

    it('should render properly',() => {
        expect(startform).toBeDefined();
    });
});