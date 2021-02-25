import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from 'react-bootstrap/Navbar';
import Headr from '../Headr.tsx';
import LanguageSelector from '../../molecules/LanguageSelector.tsx';

configure({ adapter: new Adapter() });

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
