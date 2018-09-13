import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import QualityForm from './QualityForm';

describe('QualityForm', () => {

    let qualityform;

    beforeEach(() => {
        qualityform = shallow(
            <QualityForm />
        );
    });

    it('should render properly',() => {
        expect(qualityform).toBeDefined();
    });
});