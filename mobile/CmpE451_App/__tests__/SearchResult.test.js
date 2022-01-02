import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import SearchResult from '../src/component/SearchResult';

test('Test Search Result Component', async () => {
  const mock = jest.fn();

  const {getByTestId, getByText} = render(
    <SearchResult
      id={'1'}
      name={'mock name'}
      description={'mock description'}
      isPrivate={true}
      onPress={mock}
    />,
  );

  const component = getByTestId('button');
  fireEvent.press(component);
  expect(mock).toHaveBeenCalledTimes(1);

  getByText('mock name');
  getByText('mock description');
  getByTestId('lockIcon');
});
