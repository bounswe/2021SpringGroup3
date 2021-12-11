import React from 'react';
import {View, Text} from 'react-native';
import {headerStyle} from '../theme/styles';
import {headerContainerStyle} from '../theme/styles';
import {IconButton} from 'react-native-paper';

const ScreenHeader = ({
  titleComponent,
  navigate,
  iconName = 'home-circle-outline',
}) => {
  return (
    <View style={headerContainerStyle}>
      <View style={{flex: 1}}>
        <IconButton
          icon={iconName}
          color="white"
          size={30}
          onPress={navigate}
          style={{margin: 0}}
        />
      </View>
      <View style={headerStyle}>{titleComponent}</View>
      <View style={{flex: 1}} />
    </View>
  );
};

export default ScreenHeader;
