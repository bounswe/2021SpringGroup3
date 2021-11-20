import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {underConstructionImg} from '../image/index';
import {COLORS} from '../theme/colors';

export default function underConstruction({navigation, pageName}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>
        THE {pageName} PAGE IS UNDER CONSTRUCTION !
      </Text>
      <Image source={underConstructionImg} style={styles.imageStyle} />
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
    color: COLORS.underConstructionTextColor,
    fontSize: 16,
    fontFamily: 'Cochin',
  },
  imageStyle: {
    marginTop: 0,
    resizeMode: 'contain',
    margin: 30,
  },
});
