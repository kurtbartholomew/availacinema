import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import StartForm from './StartForm';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
    const props = {
        activeIdx: 0,
        formChoices: [
            {
                id: 0,
                category: 'category',
                title: 'Form Choice',
                tooltip: 'Interesting tooltip',
                childForm: () => '',
                condition: 0,
                invalidMessage: 'BAD STUFF'
            }
        ],
        handleFormChoiceSelect: jest.fn()
    }

    return mount(<StartForm {...props} />);
}

describe('Start Form', () => {

    it('should render properly',() => {
        expect(setup()).toBeDefined();
    });
});