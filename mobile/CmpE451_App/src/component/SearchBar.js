import React from 'react';
import {View, Text, StyleSheet, Image, FlatList, StatusBar} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Ionicons name="md-search-outline" style={styles.searchIcon}></Ionicons>
      <TextInput
        style={styles.searcHInput}
        placeholder={'Search here....'}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '60%',
    height: '90%',
    backgroundColor: '#d5d5db',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searcHInput: {
    width: '100%',
    height: '100%',
    paddingLeft: 15,
    fontSize: 16,
    paddingTop: 10,
  },
  searchIcon: {
    color: 'black',
    marginLeft: 30,
    marginTop: 15,
    height: 20,
    width: 20
  },
});
