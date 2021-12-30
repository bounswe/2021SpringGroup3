import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
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
              onChangeText={textInput => {
                onChangeText(
                  fieldKey,
                  {
                    name: input.name,
                    value: {
                      geo: input.value.geo,
                      range: textInput,
                      isSelected: input.value.isSelected,
                    },
                  },
                  index,
                );
              }}
              value={input.value.range}
            />
          </View>
          <TouchableOpacity
            style={{paddingVertical: 10}}
            onPress={() => {
              onChangeText(
                fieldKey,
                {
                  name: input.name,
                  value: {
                    geo: {
                      latitude: 41,
                      longitude: 29,
                    },
                    range: 0,
                    isSelected: false,
                  },
                },
                index,
              );
            }}>
            <Text>Clear Filter</Text>
          </TouchableOpacity>
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
