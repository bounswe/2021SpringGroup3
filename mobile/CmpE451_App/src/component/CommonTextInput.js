import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {textInputArea} from '../theme/styles';

const CommonTextInput = ({
  marginHorizontal = 12,
  marginVertical = 7,
  onChangeText,
}) => {
  const [value, setValue] = useState();

  return (
    <View
      style={{
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical,
      }}>
      <TextInput
        multiline
        style={textInputArea}
        onChangeText={text => {
          onChangeText(text);
          setValue(text);
        }}
        value={value}
        placeholder={'Type tag names as comma seperated'}
      />
    </View>
  );
};

export default CommonTextInput;
