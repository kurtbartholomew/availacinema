import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import GenreForm from './GenreForm';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
    const props = {
        isFetching: false,
        genreList: [{
            id: 2,
            name: "Comedy",
            selected: false
        }],
        handleGenreToggle: jest.fn(),
        handleAllGenresSelected: jest.fn(),
        handlePanelStateChange: jest.fn(),
        loadGenres: jest.fn()
    }

    return mount(<GenreForm {...props} />);
}

describe('GenreForm', () => {

    it('should render properly',() => {
        const genreForm = setup();
        expect(genreForm).toBeDefined();
    });
});