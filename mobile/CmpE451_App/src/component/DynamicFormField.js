import React from 'react';
import {View, TextInput} from 'react-native';
import FieldHeader from './FieldHeader';
import {textInputArea} from '../theme/styles';
import {textInputContainer} from '../theme/styles';

const DynamicFormField = ({fields, fieldKey, onChangeText}) => {
  return (
    <View>
      {fields.map((input, index) => (
        <View style={textInputContainer}>
          <FieldHeader name={input.name} />
          <TextInput
            multiline
            style={textInputArea}
            onChangeText={text =>
              onChangeText(fieldKey, {name: input.name, value: text}, index)
            }
            value={input.value}
            placeholder={fieldKey}
          />
        </View>
      ))}
    </View>
  );
};

export default DynamicFormField;
