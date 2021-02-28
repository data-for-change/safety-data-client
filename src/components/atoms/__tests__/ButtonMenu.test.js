import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import ButtonMenu from '../ButtonMenu.tsx';

describe('ButtonMenu Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ButtonMenu t={(key) => key} />);
  });
  test('bottom menu has 3 items ver1', () => {
    expect(wrapper.find(Dropdown.Menu).children()).toHaveLength(3);
  });

  test('bottom menu has 3 items ver2', () => {
    expect(wrapper.find(Link)).toHaveLength(3);
  });

  test('bottom menu Dropdown.Toggle', () => {
    expect(wrapper.find(Dropdown.Toggle)).toHaveLength(1);
  });
});
