import {View, Button, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../theme/colors';
import {useIsFocused} from '@react-navigation/native';
import * as client from '../services/BoxyClient';
import CommonButton from './CommonButton.js';
import MapView from 'react-native-maps';

import {StyleSheet} from 'react-native';

export default function SwitchButton({
  firstText,
  secondText,
  firstPress,
  secondPress,
}) {
  const [isFirstOptionSelected, setisFirstOptionSelected] = useState(true);

  return (
    <View style={{flexDirection: 'row', justifyContent:'center'}}>
      <CommonButton
        onPress={() => {
          setisFirstOptionSelected(true);
          firstPress('createdAt');
        }}
        buttonBackgroundColor={
          isFirstOptionSelected ? COLORS.buttonColor : 'white'
        }
        textColor={isFirstOptionSelected ? 'white' : COLORS.buttonColor}
        text={firstText}
        buttonRadius={0}
        buttonWidth={'40%'}
      />
      <CommonButton
        onPress={() => {
          setisFirstOptionSelected(false);
          secondPress('likeCount');
        }}
        buttonBackgroundColor={
          !isFirstOptionSelected ? COLORS.buttonColor : 'white'
        }
        textColor={!isFirstOptionSelected ? 'white' : COLORS.buttonColor}
        text={secondText}
        buttonRadius={0}
        buttonWidth={'40%'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 20,
    flexDirection: 'column',
    marginVertical: 5,
  },
  commentContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 5,
    flexDirection: 'column',
    marginVertical: 8,
  },
  commentText: {
    color: 'black',
    borderRadius: 8,
    paddingLeft: 6,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: COLORS.formInputAreaColor,
    flex: 5,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  fieldName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
  },
  content: {
    fontSize: 16,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
    marginBottom: 10,
  },
  map: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    width: 180,
  },
  marker: {
    height: 48,
    width: 48,
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
});
