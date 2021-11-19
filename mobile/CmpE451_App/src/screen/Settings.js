import React from 'react';
import {View} from 'react-native';
import UnderConstruction from '../component/UnderConstruction';

export default function Settings({navigation, route}) {
  return (
    <View style={styles.container}>
      <UnderConstruction pageName="SETTINGS" />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#EBECF4',
  },
};
