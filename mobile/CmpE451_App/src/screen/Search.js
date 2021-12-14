import React from 'react';
import {View, Text} from 'react-native';
import UnderConstruction from '../component/UnderConstruction';

export default function Search({}) {
  return (
    <View style={styles.container}>
      <UnderConstruction pageName="SEARCH" />
    </View>
  );
}

const styles = {
  container: {flex: 1},
  title: {},
};
