import React from 'react';
import Login from '../src/screen/Login';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});
