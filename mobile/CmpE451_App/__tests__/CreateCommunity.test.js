import React from 'react';
import CreateCommunity from '../src/screen/CreateCommunity';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<CreateCommunity />).toJSON();
  expect(tree).toMatchSnapshot();
});
