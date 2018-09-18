import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import QualityForm from './QualityForm';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
    const props = {
        value: 5.3,
        editable: false,
        handleRatingUpdated: jest.fn(),
        handleRatingTextFieldToggled: jest.fn()
    }

    return mount(<QualityForm {...props} />);
}

describe('Quality Form', () => {

    it('should render properly',() => {
        expect(setup()).toBeDefined();
    });
});