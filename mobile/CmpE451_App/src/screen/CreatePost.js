import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, ScrollView, Alert} from 'react-native';
import {BackHandler, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import Geocoder from 'react-native-geocoding';
import MapView, {Marker} from 'react-native-maps';
import DatePicker from 'react-native-date-picker';

import DynamicFormField from '../component/DynamicFormField';
import FieldHeader from '../component/FieldHeader';
import CommonButton from '../component/CommonButton';
import CloseButton from '../component/CloseButton';
import ConfirmButton from '../component/ConfirmButton';
import {PAGE_VARIABLES} from '../constants';
import {COLORS} from '../theme/colors';
import {textInputArea} from '../theme/styles';
import {textInputContainer} from '../theme/styles';
import {headerStyle} from '../theme/styles';
import {headerContainerStyle} from '../theme/styles';
import * as Requests from '../services/BoxyClient';

export default function CreatePost({route}) {
  const {communityName} = route.params;
  const [dateFields, setDateFields] = useState([]);
  const [linkFields, setLinkFields] = useState([]);
  const [textFields, setTextFields] = useState([]);
  const [numberFields, setNumberFields] = useState([]);
  const [locationFields, setLocationFields] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState('');
  const [locationIndex, setLocationIndex] = useState(-1);
  const textFieldKey = 'text';
  const numberFieldKey = 'number';
  const dateFieldKey = 'date';
  const linkFieldKey = 'link';
  const geoLocationFieldKey = 'geoLocation';
  const locationFieldKey = 'location';
  const [markerState, setMarker] = useState({
    target: 347,
    coordinate: {
      latitude: 37.76135920121826,
      longitude: -122.4682573019337,
    },
    position: {
      x: 150,
      y: 269,
    },
  });
  const [regionState, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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

  useEffect(() => {
    async function init() {
      const postTypeDetail = await Requests.getPostTypeDetail({
        communityId: PAGE_VARIABLES.communityId,
        postTypeId: PAGE_VARIABLES.postTypeId,
      });
      const {
        dateFieldNames,
        linkFieldNames,
        numberFieldNames,
        locationFieldNames,
        textFieldNames,
      } = JSON.parse(postTypeDetail);
      if (dateFieldNames != null && dateFieldNames.length > 0) {
        const dataFieldsTemp = [];
        for (let i = 0; i < dateFieldNames.length; i++) {
          dataFieldsTemp.push({name: dateFieldNames[i], value: new Date()});
        }
        setDateFields(dataFieldsTemp);
      }
      if (linkFieldNames != null && linkFieldNames.length > 0) {
        const linkFieldsTemp = [];
        for (let i = 0; i < linkFieldNames.length; i++) {
          linkFieldsTemp.push({name: linkFieldNames[i], value: ''});
        }
        setLinkFields(linkFieldsTemp);
      }
      if (locationFieldNames != null && locationFieldNames.length > 0) {
        const locationFieldsTemp = [];
        for (let i = 0; i < locationFieldNames.length; i++) {
          locationFieldsTemp.push({
            name: locationFieldNames[i],
            value: {
              geo: {
                latitude: 0,
                longitude: 0,
              },
              description: '',
            },
          });
        }
        setLocationFields(locationFieldsTemp);
      }
      if (textFieldNames != null && textFieldNames.length > 0) {
        const textFieldsTemp = [];
        for (let i = 0; i < textFieldNames.length; i++) {
          textFieldsTemp.push({name: textFieldNames[i], value: ''});
        }
        setTextFields(textFieldsTemp);
      }
      if (numberFieldNames != null && numberFieldNames.length > 0) {
        const numberFielsTemp = [];
        for (let i = 0; i < numberFieldNames.length; i++) {
          numberFielsTemp.push({name: numberFieldNames[i], value: ''});
        }
        setNumberFields(numberFielsTemp);
      }
    }
    init();
  }, []);

  async function createPostHandler() {
    let response = await Requests.createPost({
      postTypeId: PAGE_VARIABLES.postTypeId,
      communityId: PAGE_VARIABLES.communityId,
      textFields: textFields,
      dateFields: dateFields,
      numberFields: numberFields,
      locationFields: locationFields,
      linkFields: linkFields,
    });
    response = await JSON.parse(response);
    if (response.code === 400) {
      Alert.alert('Something Went Wrong', response.message);
    } else {
      PAGE_VARIABLES.postId = response.post.id;
      navigation.navigate('PostDetail');
    }
  }

  const inputHandler = (fieldType, input, index) => {
    switch (fieldType) {
      case 'text':
        const _textInputs = [...textFields];
        _textInputs[index] = input;
        setTextFields(_textInputs);
        break;
      case 'number':
        const _numberInputs = [...numberFields];
        _numberInputs[index] = input;
        setNumberFields(_numberInputs);
        break;
      case 'date':
        const _dateInputs = [...dateFields];
        _dateInputs[index] = input;
        setDateFields(_dateInputs);
        break;
      case 'link':
        const _linkInputs = [...linkFields];
        _linkInputs[index] = input;
        setLinkFields(_linkInputs);
        break;
      case 'geoLocation':
        const _geoLocationInputs = [...locationFields];
        _geoLocationInputs[index] = {
          name: locationFields[index].name,
          value: {
            geo: input,
            description: locationFields[index].value.description,
          },
        };
        setLocationFields(_geoLocationInputs);
        break;
      case 'location':
        const _locationInputs = [...locationFields];
        _locationInputs[index] = {
          name: locationFields[index].name,
          value: {
            geo: _locationInputs[index].value.geo,
            description: input,
          },
        };
        setLocationFields(_locationInputs);
        break;
      default:
        console.info('field type not found');
    }
  };

  function chooseLocation() {
    inputHandler(geoLocationFieldKey, markerState.coordinate, locationIndex);
    setShowMap(false);
  }

  function getDateFields() {
    return (
      <View>
        {dateFields.map((input, index) => (
          <View style={textInputContainer}>
            <FieldHeader name={input.name} />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <DatePicker
                date={input.value}
                style={{height: 100}}
                onDateChange={date =>
                  inputHandler(
                    dateFieldKey,
                    {name: input.name, value: date},
                    index,
                  )
                }
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  function getLocationFields() {
    return (
      <View>
        {locationFields.map((input, index) => (
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
                  onPress={() => {
                    setShowMap(true);
                    setLocationIndex(index);
                  }}
                />
              </View>
              <TextInput
                multiline
                style={styles.locationTextInput}
                placeholder=" address definition"
                onChangeText={text => {
                  inputHandler(locationFieldKey, text, index);
                }}
                value={locationFields[index].value.description}
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  function getMapView() {
    return (
      <View style={styles.container}>
        <View style={headerContainerStyle}>
          <View style={headerStyle}>
            <Text style={{color: 'white', fontSize: 20}}>Choose Location</Text>
          </View>
          <ConfirmButton onPress={chooseLocation} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <IconButton
            icon="magnify"
            color={COLORS.buttonColor}
            size={20}
            onPress={() => {
              Geocoder.from(address)
                .then(res => {
                  var location = res.results[0].geometry.location;
                  setRegion({
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: regionState.latitudeDelta,
                    longitudeDelta: regionState.longitudeDelta,
                  });
                })
                .catch(error => console.warn(error));
            }}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={setAddress}
            placeholder="search an address"
          />
        </View>
        <MapView
          style={styles.map}
          region={regionState}
          onLongPress={e => setMarker(e.nativeEvent)}
          onRegionChangeComplete={setRegion}>
          <Marker coordinate={markerState.coordinate} />
        </MapView>
      </View>
    );
  }

  function postForm() {
    return (
      <View style={{width: '100%'}}>
        <DynamicFormField
          fields={textFields}
          fieldKey={textFieldKey}
          onChangeText={inputHandler}
        />
        <DynamicFormField
          fields={linkFields}
          fieldKey={linkFieldKey}
          onChangeText={inputHandler}
        />
        <DynamicFormField
          fields={numberFields}
          fieldKey={numberFieldKey}
          onChangeText={inputHandler}
        />
        {getLocationFields()}
        {getDateFields()}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {showMap ? (
        getMapView()
      ) : (
        <>
          <View style={headerContainerStyle}>
            <View style={headerStyle}>
              <Text style={{color: 'white', fontSize: 20}}>
                Post to {communityName}
              </Text>
            </View>
            <CloseButton onPress={navigation.goBack} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}>
                {postForm()}
              </View>
              <CommonButton
                text="POST"
                onPress={createPostHandler}
                buttonWidth={'80%'}
              />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}
const styles = {
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.formBackgroundColor,
  },
  textInput: {
    textInputArea,
    width: '85%',
  },
  locationTextInput: {
    color: 'black',
    paddingBottom: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
    flex: 9,
    backgroundColor: COLORS.formInputAreaColor,
  },
  map: {
    position: 'absolute',
    top: 110,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    height: 48,
    width: 48,
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
};
