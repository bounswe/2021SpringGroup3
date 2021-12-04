import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';

const CloseButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <IconButton icon="close-circle-outline" color="white" size={30} />
    </TouchableOpacity>
  );
};

export default CloseButton;
