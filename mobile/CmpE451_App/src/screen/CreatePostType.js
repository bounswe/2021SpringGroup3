import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS} from '../theme/colors';
import {TEXT, PAGE_VARIABLES, BASE_URL} from '../constants';
import {getToken} from '../services/asyncStorageService';
import {IconButton} from 'react-native-paper';

export default function CreatePostType({navigation}) {
  const [name, setName] = useState('');
  const [textInputs, setTextInputs] = useState([{key: '', value: ''}]);
  const [numberInputs, setNumberInputs] = useState([{key: '', value: ''}]);
  const [dateInputs, setDateInputs] = useState([{key: '', value: ''}]);
  const [linkInputs, setLinkInputs] = useState([{key: '', value: ''}]);
  const [locationInputs, setLocationInputs] = useState([{key: '', value: ''}]);

  const textFieldKey = 'text';
  const numberFieldKey = 'number';
  const dateFieldKey = 'date';
  const linkFieldKey = 'link';
  const locationFieldKey = 'location';

  const addFieldHandler = fieldType => {
    switch (fieldType) {
      case 'text':
        const _textInputs = [...textInputs];
        _textInputs.push({key: '', value: ''});
        setTextInputs(_textInputs);
        break;
      case 'number':
        const _numberInputs = [...numberInputs];
        _numberInputs.push({key: '', value: ''});
        setNumberInputs(_numberInputs);
        break;
      case 'date':
        const _dateInputs = [...dateInputs];
        _dateInputs.push({key: '', value: ''});
        setDateInputs(_dateInputs);
        break;
      case 'link':
        const _linkInputs = [...linkInputs];
        _linkInputs.push({key: '', value: ''});
        setLinkInputs(_linkInputs);
        break;
      case 'location':
        const _locationInputs = [...locationInputs];
        _locationInputs.push({key: '', value: ''});
        setLocationInputs(_locationInputs);
        break;
      default:
        console.info('field type not found');
    }
  };

  const deleteFieldHandler = (fieldType, key) => {
    switch (fieldType) {
      case 'text':
        const _textInputs = textInputs.filter((input, index) => index !== key);
        setTextInputs(_textInputs);
        break;
      case 'number':
        const _numberInputs = numberInputs.filter(
          (input, index) => index !== key,
        );
        setNumberInputs(_numberInputs);
        break;
      case 'date':
        const _dateInputs = dateInputs.filter((input, index) => index !== key);
        setDateInputs(_dateInputs);
        break;
      case 'link':
        const _linkInputs = linkInputs.filter((input, index) => index !== key);
        setLinkInputs(_linkInputs);
        break;
      case 'location':
        const _locationInputs = locationInputs.filter(
          (input, index) => index !== key,
        );
        setLocationInputs(_locationInputs);
        break;
      default:
        console.info(fieldType);
    }
  };

  const inputHandler = (fieldType, text, key) => {
    switch (fieldType) {
      case 'text':
        const _textInputs = [...textInputs];
        _textInputs[key].value = text;
        _textInputs[key].key = key;
        setTextInputs(_textInputs);
        break;
      case 'number':
        const _numberInputs = [...numberInputs];
        _numberInputs[key].value = text;
        _numberInputs[key].key = key;
        setNumberInputs(_numberInputs);
        break;
      case 'date':
        const _dateInputs = [...dateInputs];
        _dateInputs[key].value = text;
        _dateInputs[key].key = key;
        setDateInputs(_dateInputs);
        break;
      case 'link':
        const _linkInputs = [...linkInputs];
        _linkInputs[key].value = text;
        _linkInputs[key].key = key;
        setLinkInputs(_linkInputs);
        break;
      case 'location':
        const _locationInputs = [...locationInputs];
        _locationInputs[key].value = text;
        _locationInputs[key].key = key;
        setLocationInputs(_locationInputs);
        break;
      default:
        console.info('field type not found');
    }
  };

  const formatData = () => {
    const textFieldNames = textInputs
      .filter(input => input.value)
      .map(input => input.value);
    const numberFieldNames = numberInputs
      .filter(input => input.value)
      .map(input => input.value);
    const dateFieldNames = dateInputs
      .filter(input => input.value)
      .map(input => input.value);
    const linkFieldNames = linkInputs
      .filter(input => input.value)
      .map(input => input.value);
    const locationFieldNames = locationInputs
      .filter(input => input.value)
      .map(input => input.value);

    return {
      name: name,
      communityId: PAGE_VARIABLES.communityId,
      textFieldNames: textFieldNames,
      numberFieldNames: numberFieldNames,
      dateFieldNames: dateFieldNames,
      linkFieldNames: linkFieldNames,
      locationFieldNames: locationFieldNames,
    };
  };

  const createPostTypeHandler = async () => {
    fetch(BASE_URL + 'post-types', {
      method: 'POST',
      body: JSON.stringify(formatData()),
      headers: {
        'Content-Type': 'application/json',
        'X-Platform': 'ANDROID',
        Authorization: await getToken(),
      },
    })
      .then(async response => {
        const status = response.status;
        response = await response.json();
        if (status === 201) {
          navigation.navigate('Home');
        } else {
          ToastAndroid.show(response.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.info(error);
        ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.inputsContainer}
        keyboardShouldPersistTaps="handled">
        <IconButton
          icon="close"
          color="grey"
          size={20}
          onPress={() => navigation.navigate('Create Post Type')}
        />
        <View style={styles.inputNameContainer}>
          <View style={styles.fieldHeader}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={Name => setName(Name)}
              underlineColorAndroid="#f000"
              placeholder="Post Type Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="done"
              blurOnSubmit={false}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={createPostTypeHandler}>
            <View>
              <Text style={styles.buttonTextStyle}>Create Post Type</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldHeaderText}> Add Text Field </Text>
          <IconButton
            icon="plus"
            color="grey"
            size={30}
            onPress={() => addFieldHandler(textFieldKey)}
          />
        </View>
        {textInputs.map((input, key) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Enter field name'}
              value={input.value}
              onChangeText={text => inputHandler(textFieldKey, text, key)}
            />
            <TouchableOpacity
              onPress={() => deleteFieldHandler(textFieldKey, key)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldHeaderText}>Add Number Fields</Text>
          <IconButton
            icon="plus"
            color="grey"
            size={30}
            onPress={() => addFieldHandler(numberFieldKey)}
          />
        </View>
        {numberInputs.map((input, key) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Enter field name'}
              value={input.value}
              onChangeText={text => inputHandler(numberFieldKey, text, key)}
            />
            <TouchableOpacity
              onPress={() => deleteFieldHandler(numberFieldKey, key)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldHeaderText}> Add Date Field </Text>
          <IconButton
            icon="plus"
            color="grey"
            size={30}
            onPress={() => addFieldHandler(dateFieldKey)}
          />
        </View>
        {dateInputs.map((input, key) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Enter field name'}
              value={input.value}
              onChangeText={text => inputHandler(dateFieldKey, text, key)}
            />
            <TouchableOpacity
              onPress={() => deleteFieldHandler(dateFieldKey, key)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldHeaderText}>Add Link Field</Text>
          <IconButton
            icon="plus"
            color="grey"
            size={30}
            onPress={() => addFieldHandler(linkFieldKey)}
          />
        </View>
        {linkInputs.map((input, key) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Enter field name'}
              value={input.value}
              onChangeText={text => inputHandler(linkFieldKey, text, key)}
            />
            <TouchableOpacity
              onPress={() => deleteFieldHandler(linkFieldKey, key)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldHeaderText}>Add Location Field</Text>
          <IconButton
            icon="plus"
            color="grey"
            size={30}
            onPress={() => addFieldHandler(locationFieldKey)}
          />
        </View>
        {locationInputs.map((input, key) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Enter field name'}
              value={input.value}
              onChangeText={text => inputHandler(locationFieldKey, text, key)}
            />
            <TouchableOpacity
              onPress={() => deleteFieldHandler(locationFieldKey, key)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: 'white',
  },
  fieldHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#00227b',
  },
  inputsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginLeft: 25,
    marginRight: 20,
  },
  inputNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginLeft: 10,
    marginRight: 20,
  },
  deleteText: {
    color: '#9b0000',
    fontSize: 13,
  },
  button: {
    color: COLORS.buttonColor,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginLeft: 8,
  },
  buttonStyle: {
    backgroundColor: COLORS.buttonColor,
    borderWidth: 0,
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: COLORS.buttonTextColor,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  iconView: {
    flex: 3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 24,
  },
});