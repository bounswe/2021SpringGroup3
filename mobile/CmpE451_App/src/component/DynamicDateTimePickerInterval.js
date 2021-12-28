import React, {useState} from 'react';
import {View, Button} from 'react-native';
import FieldHeader from './FieldHeader';
import DatePicker from 'react-native-date-picker';
import {textInputContainer} from '../theme/styles';

const DynamicDateTimePickerInterval = ({fields, fieldKey, onChangeDate}) => {
  const [startOpen, setStartOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endOpen, setEndOpen] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  return (
    <View>
      {fields.map((input, index) => (
        <View style={textInputContainer}>
          <FieldHeader name={input.name} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              title="Choose Start Date"
              onPress={() => setStartOpen(true)}
            />
            <DatePicker
              modal
              date={startDate}
              open={startOpen}
              style={{height: 100}}
              onConfirm={date => {
                setStartOpen(false);
                setStartDate(date);
                onChangeDate(
                  fieldKey,
                  {name: input.name, value: {start: date, end: endDate}},
                  index,
                );
              }}
              onCancel={() => {
                setStartOpen(false);
              }}
            />
            <Button title="Choose End Date" onPress={() => setEndOpen(true)} />
            <DatePicker
              modal
              date={endDate}
              open={endOpen}
              style={{height: 100}}
              onConfirm={date => {
                setEndOpen(false);
                setEndDate(date);
                onChangeDate(
                  fieldKey,
                  {name: input.name, value: {start: startDate, end: date}},
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
