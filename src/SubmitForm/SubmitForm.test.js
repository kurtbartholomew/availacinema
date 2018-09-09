import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import SubmitForm from './SubmitForm';

describe('SubmitForm', () => {

    let submitform;

    beforeEach(() => {
        submitform = shallow(
            <SubmitForm />
        );
    });

    it('should render properly',() => {
        expect(submitform).toBeDefined();
    });
});