import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import ButtonMenu from '../ButtonMenu';

it('ButtonMenu render no crash', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ButtonMenu />, div);
  ReactDOM.unmountComponentAtNode(div);
});
