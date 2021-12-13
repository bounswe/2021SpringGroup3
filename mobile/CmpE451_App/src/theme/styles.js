import {COLORS} from './colors';

export const screenOptionStyle = {
  headerStyle: {
    backgroundColor: COLORS.screenHeaderBackground,
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

export const headerContainerStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 7,
  backgroundColor: COLORS.screenHeaderBackground,
  height: 50,
};

export const headerStyle = {
  flexDirection: 'row',
  flex: 4,
  justifyContent: 'center',
};

export const headerTextStyle = {
  color: 'white',
  fontSize: 20,
};

export const textInputArea = {
  color: 'black',
  paddingBottom: 1,
  borderWidth: 1,
  borderColor: 'lightgray',
  backgroundColor: COLORS.formInputAreaColor,
};

export const textInputContainer = {
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginLeft: 25,
  marginRight: 20,
  paddingBottom: 20,
  paddingTop: 10,
};

export const list = {
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 16,
};

export const listItem = {
  padding: 10,
  fontSize: 16,
  height: 50,
  color: COLORS.textColor,
  textAlignVertical: 'center',
};