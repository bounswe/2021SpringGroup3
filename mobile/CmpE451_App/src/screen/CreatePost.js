import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
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
  const {communityName, communityId} = route.params;
  const [dateFieldNames, setDateFieldNames] = useState({name: '', value: ''});
  const [linkFieldNames, setLinkFieldNames] = useState({name: '', value: ''});
  const [locationFieldNames, setLocationFieldNames] = useState({
    name: '',
    value: '',
  });
  const [textFieldNames, setTextFieldNames] = useState({name: '', value: ''});
  const [numberFieldNames, setNumberFieldNames] = useState({
    name: '',
    value: '',
  });
  const navigation = useNavigation();
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

  const cleanEmptyValuesObject = obj => {
    for (var propName in obj) {
      if (
        obj[propName] === '' ||
        obj[propName] === undefined ||
        obj[propName] === null
      ) {
        delete obj[propName];
      }
    }
    return obj;
  };

  useEffect(async () => {
    const postTypeDetail = await Requests.getPostTypeDetail({
      communityId: PAGE_VARIABLES.communityId,
      postTypeId: PAGE_VARIABLES.postTypeId,
    });
    const {
      dateFieldNames,
      id,
      linkFieldNames,
      numberFieldNames,
      locationFieldNames,
      name,
      textFieldNames,
    } = JSON.parse(postTypeDetail);

    console.log('JSON.parse(postTypeDetail);: ', JSON.parse(postTypeDetail));
    if (dateFieldNames != null && dateFieldNames.length > 0) {
      setDateFieldNames({name: dateFieldNames[0], value: ''});
    }
    if (linkFieldNames != null && linkFieldNames.length > 0) {
      setLinkFieldNames({name: linkFieldNames[0], value: ''});
    }

    if (locationFieldNames != null && locationFieldNames.length > 0) {
      setLocationFieldNames({name: locationFieldNames[0], value: ''});
    }

    if (textFieldNames != null && textFieldNames.length > 0) {
      setTextFieldNames({name: textFieldNames[0], value: ''});
    }
    if (numberFieldNames != null && numberFieldNames.length > 0) {
      setNumberFieldNames({name: numberFieldNames[0], value: ''});
    }
  }, []);

  async function createPostHandler() {
    let response = await Requests.createPost(
      cleanEmptyValuesObject({
        postTypeId: PAGE_VARIABLES.postTypeId,
        communityId: PAGE_VARIABLES.communityId,
        textFields: textFieldNames.value === '' ? null : [textFieldNames],
        dateFields: [
          {
            name: 'Date',
            value: '2021-11-16T13:48:40.868+03:00',
          },
        ],
        numberFields: numberFieldNames.value === '' ? null : [numberFieldNames],
        locationFields:
          locationFieldNames.value === '' ? null : [locationFieldNames],
        linkFields: linkFieldNames.value === '' ? null : [linkFieldNames],
      }),
    );
    response = await JSON.parse(response);
    if (response.code === 400)
      Alert.alert('Something Went Wrong', response.message);
    else {
      PAGE_VARIABLES.postId = response.post.id;
      navigation.navigate('PostDetail');
    }
  }

  function getNameOfPost() {
    if (textFieldNames.name === '') return null;
    return (
      <View
        style={{
          margin: 5,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          width: '100%',
          borderColor: 'red',
        }}>
        {getName(textFieldNames.name)}
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            placeholder: 'Match Name',
            placeholderTextColor: 'gray',
            color: 'black',
            margin: 5,
            paddingBottom: 1,
          }}
          onChangeText={text =>
            setTextFieldNames({name: textFieldNames.name, value: text})
          }
          value={textFieldNames.value}
          placeholder="......."
        />
      </View>
    );
  }

  function getName(key) {
    return (
      <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
        {key}
      </Text>
    );
  }

  function getTextFieldNames() {
    if (textFieldNames.name === '') return null;
    return (
      <View
        style={{
          margin: 5,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
        }}>
        {getName(textFieldNames.name)}
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            placeholder: 'Match Name',
            placeholderTextColor: 'gray',
            color: 'black',
            margin: 5,
            paddingBottom: 1,
          }}
          onChangeText={text =>
            setTextFieldNames({name: textFieldNames.name, value: text})
          }
          value={textFieldNames.value}
          placeholder="......."
        />
      </View>
    );
  }
  function getDate() {
    if (dateFieldNames.name === '') return null;
    return (
      <View
        style={{
          margin: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Date:
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            placeholder: 'Match Name',
            placeholderTextColor: 'gray',
            color: 'black',
            margin: 5,
            paddingBottom: 1,
          }}
          onChangeText={text =>
            setDateFieldNames({name: dateFieldNames.name, value: text})
          }
          value={dateFieldNames.value}
          placeholder="......."
        />
      </View>
    );
  }

  function getLink() {
    if (linkFieldNames.name === '') return null;
    return (
      <View
        style={{
          margin: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {getName(linkFieldNames.name)}
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            placeholder: 'Match Name',
            placeholderTextColor: 'gray',
            color: 'black',
            margin: 5,
            paddingBottom: 1,
          }}
          onChangeText={text =>
            setLinkFieldNames({name: linkFieldNames.name, value: text})
          }
          value={linkFieldNames.value}
          placeholder="......."
        />
      </View>
    );
  }
  function getNumbers() {
    if (numberFieldNames.name === '') return null;
    return (
      <View
        style={{
          margin: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {getName(numberFieldNames.name)}
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            placeholder: 'Match Name',
            placeholderTextColor: 'gray',
            color: 'black',
            margin: 5,
            paddingBottom: 1,
          }}
          onChangeText={text =>
            setNumberFieldNames({name: numberFieldNames.name, value: text})
          }
          value={numberFieldNames.value}
          placeholder="......."
        />
      </View>
    );
  }
  function getLocation() {
    if (locationFieldNames.name === '') return null;
    return (
      <View
        style={{
          margin: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {getName(locationFieldNames.name)}
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            placeholder: 'Match Name',
            placeholderTextColor: 'gray',
            color: 'black',
            margin: 5,
            paddingBottom: 1,
          }}
          onChangeText={text =>
            setLocationFieldNames({name: locationFieldNames.name, value: text})
          }
          value={locationFieldNames.value}
          placeholder="......."
        />
      </View>
    );
  }
  function myForum() {
    return (
      <View style={{alignContent: 'center'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {getTextFieldNames()}
          {getDate()}
          {getLink()}
          {getLocation()}
          {getNumbers()}
        </ScrollView>
      </View>
    );
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
          <Text style={{color: 'black', margin: 5}}>{communityName}</Text>
        </View>
        <Text>RULES</Text>
      </View>
      <View
        style={{
          minHeight: '50%',
          maxHeight: '50%',
          alignItems: 'flex-start',
        }}>
        {myForum()}
      </View>
    </View>
  );
}
const styles = {
  container: {flex: 1, height: '100%'},
  title: {},
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
};
