import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import NotificationForm from './NotificationForm';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
    const props = {
        contactOptions: {
            EMAIL_DAILY: false,
            EMAIL_WEEKLY: true,
            TEXT_DAILY: false,
            TEXT_WEEKLY: false
        },
        handleToggleNotifyOption: jest.fn(),
        handlePhoneChange: jest.fn(),
        handleEmailChange: jest.fn(),
        contactEmail: {
            value: "jim@gmail.com",
            valid: true
        },
        contactEmail: {
            value: "",
            valid: false
        }
    }

    return mount(<NotificationForm {...props} />);
}

describe('NotificationForm', () => {

    it('should render properly',() => {
        const notificationForm= setup();
        expect(notificationForm).toBeDefined();
    });
});