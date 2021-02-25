import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SelectGroupBy from '../SelectGroupBy.tsx';
import MySelect from '../MySelect.tsx';

configure({ adapter: new Adapter() });

describe('SelectGroupBy Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SelectGroupBy id="Test" t={(key) => key} />);
  });

  test('SelectGroupBy ', () => {
    expect(wrapper.find(MySelect)).toHaveLength(1);
  });
});
