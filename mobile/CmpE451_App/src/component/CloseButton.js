import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';

const DeleteButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <IconButton
        icon="close-circle-outline"
        color="white"
        size={25}
        style={{margin: 0}}
      />
    </TouchableOpacity>
  );
};

export default DeleteButton;
