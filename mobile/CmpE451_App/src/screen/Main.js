import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Header from '../component/HeaderForMainPage';
import UnderConstruction from '../component/UnderConstruction';
import {COLORS} from '../theme/colors';

export default function Main({navigation, route}) {
  return (
    <View style={styles.container}>
      <Header text={'Gönderiler'} navigation={navigation} />
      <UnderConstruction pageName="HOME" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBECF4',
    alignItems: 'center',
  },
  header: {
    paddingTop: 10,
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
    paddingTop: 10,
    color: COLORS.textColor,
    fontSize: 20,
    fontFamily: 'Cochin',
  },
});
