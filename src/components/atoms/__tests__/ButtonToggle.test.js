import React from 'react';
import { shallow } from 'enzyme';
import Button from 'react-bootstrap/Button';
import ButtonToggle from '../ButtonToggle.tsx';

describe('ButtonToggle Test', () => {
  let wrapper;
  let val = true;
  const buttonFunction = () => {
    // eslint-disable-next-line no-console
    console.log('button Func');
    val = !val;
  };
  beforeEach(() => {
    wrapper = shallow(
      <ButtonToggle
        condtion
        textTrue="HeatMap"
        textFalse="Markers"
        disabled={false}
        onClick={buttonFunction}
        t={(key) => key}
      />,
    );
  });

  test('ButtonToggle has Button', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  test('ButtonToggle click tuggle', () => {
    wrapper.find(Button).simulate('click');
    expect(val).toBe(false);
  });
});
