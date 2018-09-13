import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import React from 'react';
import Main from './Main';

describe('Main', () => {

    let main;

    beforeEach(() => {
        main = shallow(
            <Main />
        );
    });

    it('should render properly',() => {
        expect(main).toBeDefined();
    });
});