import React from 'react';
import {IconButton} from 'react-native-paper';
import {COLORS} from '../theme/colors';

const CloseButton = ({onPress}) => {
  return (
    <IconButton
      icon="delete-circle-outline"
      color={COLORS.lightButtonColor}
      size={25}
      onPress={onPress}
      style={{flex: 1, marginRight:12}}
    />
  );
};

export default CloseButton;
