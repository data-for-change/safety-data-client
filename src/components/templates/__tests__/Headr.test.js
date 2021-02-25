import React from 'react';
import { shallow } from 'enzyme';
import Navbar from 'react-bootstrap/Navbar';
import Headr from '../Headr.tsx';
import LanguageSelector from '../../molecules/LanguageSelector.tsx';

describe('Header Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Headr title="test" />);
  });

  test('header has Navbar ', () => {
    expect(wrapper.find(Navbar)).toHaveLength(1);
  });

  test('header has LanguageSelector ', () => {
    expect(wrapper.find(LanguageSelector)).toHaveLength(1);
  });
});
