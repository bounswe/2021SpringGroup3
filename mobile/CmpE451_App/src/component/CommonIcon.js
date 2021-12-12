import React from 'react';
import {StyleSheet} from 'react-native';

import {IconButton} from 'react-native-paper';

export default function CommonIcon({icon, onPress, IconColor}) {
  return (
    <IconButton
      icon={icon}
      size={20}
      color={IconColor}
      onPress={onPress}
      style={{marginHorizontal: 3}}
    />
  );
}
