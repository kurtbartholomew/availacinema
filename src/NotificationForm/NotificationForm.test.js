import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import NotificationForm from './NotificationForm';

describe('NotificationForm', () => {

    let notificationform;

    beforeEach(() => {
        notificationform = shallow(
            <NotificationForm />
        );
    });

    it('should render properly',() => {
        expect(notificationform).toBeDefined();
    });
});