import React from 'react';
import {IconButton} from 'react-native-paper';

const HomeButton = ({navigation}) => {
  return (
    <IconButton
      icon="home-circle-outline"
      color="white"
      size={30}
      style={{margin: 0, flex: 1}}
      onPress={() => navigation.navigate('Main')}
    />
  );
};

export default HomeButton;
