import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

export default function Profile({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BURASI Profile SAYFASIDIR</Text>
    </View>
  );
}

const styles = {
  container: {flex: 1},
  title: {},
};
