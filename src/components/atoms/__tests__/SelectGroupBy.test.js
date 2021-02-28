import React from 'react';
import { shallow } from 'enzyme';
import SelectGroupBy from '../SelectGroupBy.tsx';
import MySelect from '../MySelect.tsx';

describe('SelectGroupBy Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SelectGroupBy id="Test" t={(key) => key} />);
  });

  test('SelectGroupBy ', () => {
    expect(wrapper.find(MySelect)).toHaveLength(1);
  });
});
