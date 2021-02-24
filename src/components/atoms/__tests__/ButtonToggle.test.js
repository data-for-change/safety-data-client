import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
// import { render } from '@testing-library/react';
import ButtonToggle from '../ButtonToggle';
import '../../../i18n';

it('ButtonToggle render no crash', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ButtonToggle />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// test('ButtonToggle test1', () => {
//   const component = renderer.create(
//     <ButtonToggle
//       condtion={useSmallMarkers}
//       textTrue="big-markers"
//       textFalse="small-markers"
//       onClick={toggleUseSmallMarkers}
//     />,
//   );

// });
