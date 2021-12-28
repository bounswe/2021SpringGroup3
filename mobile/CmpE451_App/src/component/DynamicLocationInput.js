import React from 'react';
import {View, TextInput} from 'react-native';
import {IconButton} from 'react-native-paper';
import FieldHeader from '../component/FieldHeader';
import {COLORS} from '../theme/colors';
import {textInputContainer} from '../theme/styles';

const DynamicLocationInput = ({fields, fieldKey, onPress, onChangeText}) => {
  return (
    <View>
      {fields.map((input, index) => (
        <View style={textInputContainer}>
          <FieldHeader name={input.name} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View>
              <IconButton
                icon="map-marker"
                color={COLORS.fieldHeaderColor}
                size={30}
                onPress={() => onPress(index)}
              />
            </View>
            <FieldHeader name={'Range (km)'} />
            <TextInput
              multiline
              style={styles.locationTextInput}
              placeholder="radius"
              onChangeText={text => {
                onChangeText(
                  fieldKey,
                  {
                    name: input.name,
                    value: {
                      geo: input.value.geo,
                      range: text,
                    },
                  },
                  index,
                );
              }}
              value={input.value.range}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.formBackgroundColor,
  },
  fieldHeader: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
};

export default DynamicLocationInput;
