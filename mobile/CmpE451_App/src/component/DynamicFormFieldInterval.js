import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import FieldHeader from './FieldHeader';
import {textInputArea} from '../theme/styles';
import {textInputContainer} from '../theme/styles';

const DynamicFormFieldInterval = ({fields, fieldKey, onChangeText}) => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  return (
    <View>
      {fields.map((input, index) => (
        <View style={textInputContainer}>
          <FieldHeader name={input.name} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <FieldHeader name={'Start'} />
              <TextInput
                multiline
                style={textInputArea}
                onChangeText={text1 => {
                  setStart(text1);
                  onChangeText(
                    fieldKey,
                    {name: input.name, value: {start: text1, end: end}},
                    index,
                  );
                }}
                value={input.value.start}
                placeholder={fieldKey}
              />
            </View>
            <View style={{flex: 1}}>
              <FieldHeader name={'End'} />
              <TextInput
                multiline
                style={textInputArea}
                onChangeText={async text2 => {
                  setEnd(text2);
                  onChangeText(
                    fieldKey,
                    {name: input.name, value: {start: start, end: text2}},
                    index,
                  );
                }}
                value={input.value.end}
                placeholder={fieldKey}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default DynamicFormFieldInterval;
