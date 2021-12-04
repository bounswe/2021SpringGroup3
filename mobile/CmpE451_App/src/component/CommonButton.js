import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../theme/colors';

const CommonButton = ({
  text,
  textColor = COLORS.buttonTextColor,
  onPress,
  activeOpacity = 0.5,
  buttonBackgroundColor = COLORS.buttonColor,
  buttonBorderColor = COLORS.buttonColor,
  borderWidth = 0,
  buttonMarginTop = 0,
  buttonMarginBottom = 0,
  buttonMarginLeft = 0,
  buttonMarginRight = 0,
  buttonHeight = 50,
  buttonWidth = '80%',
  buttonRadius = 12,
}) => {
  const buttonStyle = {
    backgroundColor: buttonBackgroundColor,
    borderWidth: borderWidth,
    borderColor: buttonBorderColor,
    height: buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: buttonRadius,
    marginLeft: buttonMarginLeft,
    marginRight: buttonMarginRight,
    marginTop: buttonMarginTop,
    marginBottom: buttonMarginBottom,
    width: buttonWidth,
  };

  const buttonTextStyle = {
    color: textColor,
    paddingVertical: 10,
    fontSize: 16,
    textAlign: 'center',
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      activeOpacity={activeOpacity}
      onPress={onPress}>
      <View>
        <Text style={buttonTextStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommonButton;
