import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import NotFound from './NotFound';

describe('NotFound', () => {

    let notFound;

    beforeEach(()=> {
        notFound = shallow(
            <NotFound />
        );
    })
    
    it('should render properly', () => {
        expect(notFound).toBeDefined();
    });
});