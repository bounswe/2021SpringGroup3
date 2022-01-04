import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import FieldHeader from './FieldHeader';
import DatePicker from 'react-native-date-picker';
import {textInputContainer} from '../theme/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DynamicDateTimePickerInterval = ({fields, fieldKey, onChangeDate}) => {
  const [startOpen, setStartOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endOpen, setEndOpen] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  let isStartDateSelected = false;
  let isEndDateSelected = false;

  return (
    <View>
      {fields.map((input, index) => (
        <View style={textInputContainer}>
          <FieldHeader name={input.name} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Button
                title="Choose Start Date"
                onPress={() => setStartOpen(true)}
              />
              <TouchableOpacity
                style={{paddingVertical: 10}}
                onPress={() => {
                  setStartDate(new Date());
                  isStartDateSelected = false;
                  onChangeDate(
                    fieldKey,
                    {
                      name: input.name,
                      value: {
                        start: new Date(-8640000000000000),
                        end: isEndDateSelected
                          ? endDate
                          : new Date(8640000000000000),
                      },
                    },
                    index,
                  );
                }}>
                <Text>Clear Filter</Text>
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              date={startDate}
              open={startOpen}
              style={{height: 100}}
              onConfirm={date => {
                isStartDateSelected = true;
                setStartOpen(false);
                setStartDate(date);
                onChangeDate(
                  fieldKey,
                  {
                    name: input.name,
                    value: {
                      start: date,
                      end: isEndDateSelected
                        ? endDate
                        : new Date(8640000000000000),
                    },
                  },
                  index,
                );
              }}
              onCancel={() => {
                setStartOpen(false);
              }}
            />
            <View>
              <Button
                title="Choose End Date"
                onPress={() => setEndOpen(true)}
              />
              <TouchableOpacity
                style={{paddingVertical: 10}}
                onPress={() => {
                  setEndDate(new Date());
                  isEndDateSelected = false;
                  onChangeDate(
                    fieldKey,
                    {
                      name: input.name,
                      value: {
                        start: isStartDateSelected
                          ? startDate
                          : new Date(-8640000000000000),
                        end: new Date(8640000000000000),
                      },
                    },
                    index,
                  );
                }}>
                <Text>Clear Filter</Text>
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              date={endDate}
              open={endOpen}
              style={{height: 100}}
              onConfirm={date => {
                isEndDateSelected = true;
                setEndOpen(false);
                setEndDate(date);
                onChangeDate(
                  fieldKey,
                  {
                    name: input.name,
                    value: {
                      start: isStartDateSelected
                        ? startDate
                        : new Date(-8640000000000000),
                      end: date,
                    },
                  },
                  index,
                );
              }}
              onCancel={() => {
                setEndOpen(false);
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default DynamicDateTimePickerInterval;
