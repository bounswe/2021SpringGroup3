import React from 'react';
import CreatePostType from '../src/screen/CreatePostType';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<CreatePostType />).toJSON();
  expect(tree).toMatchSnapshot();
});
