import React from 'react';
import CreatePost from '../src/screen/CreatePost';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<CreatePost route={{params: {communityName: 'community'}}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
