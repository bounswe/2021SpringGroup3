import React from 'react';
import {Text} from 'react-native';
import {COLORS} from '../theme/colors';

const FieldHeader = ({name}) => {
  return (
    <Text style={{color: COLORS.fieldHeaderColor, marginVertical: 6}}>
      {name}:
    </Text>
  );
};

export default FieldHeader;
