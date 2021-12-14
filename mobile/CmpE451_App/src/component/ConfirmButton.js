import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';

const ConfirmButton = ({
  onPress,
  flex = 1,
  flexDirection = 'row',
  justifyContent = 'flex-end',
}) => {
  const buttonStyle = {
    flex: flex,
    flexDirection: flexDirection,
    justifyContent: justifyContent,
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <IconButton icon="check-circle-outline" color="white" size={30} />
    </TouchableOpacity>
  );
};

export default ConfirmButton;
