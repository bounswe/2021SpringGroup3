import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../component/HeaderForMainPage';
import PostList from '../component/PostList';

export default function Main({navigation, route}) {
  return (
    <View style={styles.container}>
      <Header text={'Gönderiler'} navigation={navigation}></Header>
      <Text>Home page is under construction</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBECF4',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
});
