import React from 'react';
import Settings from '../src/screen/Settings';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Settings />).toJSON();
  expect(tree).toMatchSnapshot();
});
