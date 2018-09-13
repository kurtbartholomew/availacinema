import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import GenreForm from './GenreForm';

describe('GenreForm', () => {

    let genreform;

    beforeEach(() => {
        genreform = shallow(
            <GenreForm />
        );
    });

    it('should render properly',() => {
        expect(genreform).toBeDefined();
    });
});