import React from 'react';
import ReactDOM from 'react-dom';
import Advisor from './Advisor';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Advisor />, div);
  ReactDOM.unmountComponentAtNode(div);
});
