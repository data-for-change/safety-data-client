import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import ButtonToggle from '../ButtonToggle';

it('ButtonToggle render no crash', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ButtonToggle />, div);
  ReactDOM.unmountComponentAtNode(div);
});
