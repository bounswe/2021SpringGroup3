import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';

const DeleteButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{margin: 0, flex: 1}}>
      <IconButton
        icon="home-circle-outline"
        color="white"
        size={30}
        style={{margin: 0, flex: 1}}
      />
    </TouchableOpacity>
  );
};

export default DeleteButton;
