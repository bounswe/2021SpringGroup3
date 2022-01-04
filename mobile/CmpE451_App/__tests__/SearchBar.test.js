import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import SearchBar from '../src/component/SearchBar';

test('Test Search Bar Component', async () => {
  const mock = jest.fn();

  const {getByPlaceholderText} = render(
    <SearchBar onSearch={mock} isSearchEnabled={true} onPress={mock} />,
  );
  const mockSearchData = 'mock data';

  const searchBarInput = getByPlaceholderText('Search');
  fireEvent.changeText(searchBarInput, mockSearchData);
  fireEvent.press(searchBarInput, mockSearchData);

  expect(mock).toBeCalledWith(mockSearchData);

  expect(mock).toHaveBeenCalledTimes(2);
});
