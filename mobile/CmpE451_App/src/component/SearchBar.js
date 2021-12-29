import {View, Text} from 'react-native';
import React from 'react';
import {IconButton} from 'react-native-paper';
import {COLORS} from '../theme/colors';
import {TouchableOpacity, StyleSheet, TextInput, Keyboard} from 'react-native';

export default function SearchBar({
  searchText = 'Search',
  onPress,
  isSearchEnabled,
  onSearch,
}) {
  return (
    <View style={styles.searchBarContainer}>
      <TouchableOpacity style={styles.searchBar} onPress={onPress}>
        <IconButton
          icon="magnify"
          size={24}
          color={COLORS.unlikeButtonColor}
          style={{flex: 1}}
        />
        {isSearchEnabled ? (
          <TextInput
            style={styles.input}
            underlineColorAndroid="#f000"
            placeholder={searchText}
            placeholderTextColor={COLORS.unlikeButtonColor}
            returnKeyType="next"
            onChangeText={text => onSearch(text)}
            blurOnSubmit={false}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        ) : (
        <Text style={{flex: 9, fontSize: 15}}>{searchText}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95%',
    width: '90%',
    backgroundColor: '#E5E4E2',
    border: 3,
    borderRadius: 2,
    marginHorizontal: 4,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '95%',
    backgroundColor: '#D3D3D3',
    border: 3,
    borderRadius: 10,
  },
  input: {
    height: 40,
    marginVertical: 12,
    flex: 9,
    paddingVertical: 10,
  },
});
