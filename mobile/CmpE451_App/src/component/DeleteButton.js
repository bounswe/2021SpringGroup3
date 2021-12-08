import React from 'react';
import {IconButton} from 'react-native-paper';

const CloseButton = ({onPress}) => {
  return (
    <IconButton
      icon="delete-outline"
      color="#9b0000"
      size={25}
      onPress={onPress}
      style={{flex: 1, paddingHorizontal:3}}
    />
  );
};

export default CloseButton;
