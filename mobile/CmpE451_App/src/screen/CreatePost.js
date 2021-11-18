import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {BackHandler, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../component/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {size} from 'lodash';
import {bold} from 'chalk';
import * as Requests from '../util/Reguests';
import {TEXT, PAGE_VARIABLES, BASE_URL} from '../constants';

export default function CreatePost({route}) {
  const navigation = useNavigation();

  const [index, setIndex] = useState(true);
  const [name, setName] = useState('');
  const [numberOfParticipants, setNumberOfParticipants] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');
  const [textInputs, setTextInputs] = useState([{key: '', value: ''}]);
  const [linkedFieldNames, setLinkedFieldNames] = useState([
    {key: '', value: ''},
  ]);
  const [locationFieldNames, setLocationFieldNames] = useState([
    {key: '', value: ''},
  ]);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('Home', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener('Home', handleBackButtonClick);
      };
    }
  }, []);

  useEffect(async () => {
    const response = await Requests.getPostTypesDetail({
      communityId: PAGE_VARIABLES.communityId,
      postTypeId: PAGE_VARIABLES.postTypeId,
    });
    const parsedResponse = JSON.parse(response);
    setTextInputs([{key: parsedResponse.textFieldNames[0], value: ''}]);
    setLinkedFieldNames([{key: parsedResponse.linkFieldNames[0], value: ''}]);
    setLocationFieldNames([
      {key: parsedResponse.locationFieldNames[0], value: ''},
    ]);
    console.log(' JSON.parse(response).linkedFieldNames[0]', parsedResponse);
  }, []);

  const inputHandler = (text, index, key) => {
    console.log('text:', text);
    const _textInputs = [...textInputs];
    _textInputs[index].value = text;
    _textInputs[index].key = key;
    setTextInputs(_textInputs);
  };
  async function createPostHandler() {
    const response = await Requests.createPostHandler({
      communityId: PAGE_VARIABLES.communityId,
      postTypeId: PAGE_VARIABLES.postTypeId,
      textFieldNames: textInputs,
      numberFieldNames: [],
      dateFieldNames: [],
      linkFieldNames: [],
      locationFieldNames: [],
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={34} style={{marginLeft: 5}}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={createPostHandler}>
          <View style={styles.nextButton}>
            <Text>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.postTitleArea}>
        <View
          style={{
            width: 200,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Icon name="cube-sharp" size={20} style={{margin: 5}} />
          <Text style={{color: 'black', margin: 5}}>Community Name</Text>
        </View>
        <Text>RULES</Text>
      </View>
      <View
        style={{
          minHeight: '50%',
          maxHeight: '50%',
          alignItems: 'flex-start',
        }}>
        {textInputs.map((input, key) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={input.key}
              value={input.value}
              onChangeText={text => {
                inputHandler(text, key, input.key);
              }}
            />
          </View>
        ))}
        {linkedFieldNames[0].value != ''
          ? linkedFieldNames.map((input, key) => (
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={input.key}
                  value={input.value}
                  onChangeText={text => {
                    inputHandler(text, key, input.key);
                  }}
                />
              </View>
            ))
          : null}
        {locationFieldNames[0].value != ''
          ? locationFieldNames.map((input, key) => (
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={input.key}
                  value={input.value}
                  onChangeText={text => {
                    inputHandler(text, key, input.key);
                  }}
                />
              </View>
            ))
          : null}
      </View>
    </View>
  );
}
const styles = {
  container: {flex: 1, height: '100%'},
  title: {},
  deleteText: {
    color: '#9b0000',
    fontSize: 13,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextButton: {
    margin: 5,
    width: 70,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#C5C6C6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postTitleArea: {
    justifyContent: 'space-between',
    marginHorizontal: 10,
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
};
