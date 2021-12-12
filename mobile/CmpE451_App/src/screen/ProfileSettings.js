import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import * as Request from '../util/Requests';
import ToggleSwitch from 'toggle-switch-react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {headerContainerStyle} from '../theme/styles';
import {headerStyle} from '../theme/styles';
import {textInputArea} from '../theme/styles';

import {
  TEXT,
  PAGE_VARIABLES,
  BASE_URL,
  DEFAULT_PROFILE_IMAGE,
} from '../constants';
import ConfirmButton from '../component/ConfirmButton';
import {IconButton} from 'react-native-paper';
import {COLORS} from '../theme/colors';
export default function ProfileSettings({route}) {
  const {username, location, birthday, bio, profileImageUrl} = route.params;
  const navigation = useNavigation();
  const [newBio, setNewBio] = useState({value: bio, isPublic: false});
  const [newBirthday, setNewBirthday] = useState({
    value: birthday,
    isPublic: false,
  });
  const [newLocation, setNewLocation] = useState({
    value: location,
    isPublic: false,
  });
  const [newProfileImage, setNewProfileImage] = useState({
    value: {
      uri: '',
      fileName: '',
      type: '',
      base64: '',
    },
    isPublic: false,
  });
  const [oldProfileImage, setOldProfileImage] = useState({
    value: profileImageUrl,
    isPublic: false,
  });
  const [newUsername, setNewUsername] = useState(username);
  const [datePickerShow, setDatePickerShow] = useState(false);
  const [address, setAddress] = useState('');
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
  const [showMap, setShowMap] = useState(false);

  useEffect(async () => {
    const {username, profilePhotoUrl, bio, birthday, location} =
      await Request.getUserSettings();
    setOldProfileImage({
      value: profilePhotoUrl.value,
      isPublic: profilePhotoUrl.isPublic,
    });
    setNewUsername(username);
    setNewBio({value: bio.value, isPublic: bio.isPublic});
    setNewBirthday({value: birthday.value, isPublic: birthday.isPublic});
    setNewLocation({value: location.description, isPublic: location.isPublic});
  }, []);
  async function handleUpload() {
    const response = await launchImageLibrary({
      includeBase64: true,
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
    });
    if (response.didCancel) console.log('Cancel', cancel);
    const image = {
      uri: response.assets[0].uri,
      fileName: response.assets[0].fileName,
      type: response.assets[0].type,
      base64: response.assets[0].base64,
    };
    setNewProfileImage({value: image, isPublic: oldProfileImage.isPublic});
  }
  function checkAllFields() {
    if (
      newProfileImage.value.base64 === '' ||
      newBio.value === '' ||
      newBirthday.value === ''
    ) {
      Alert.alert('Please Fill All Fields');
      return true;
    }
  }
  async function updateUserSettings() {
    if (checkAllFields()) return;
    const response = await Request.updateUserSettings({
      profilePhoto: {
        value: newProfileImage.value.base64,
        isPublic: newProfileImage.isPublic,
      },
      bio: {
        value: newBio.value,
        isPublic: newBio.isPublic,
      },
      birthday: {
        value: newBirthday.value,
        isPublic: newBirthday.isPublic,
      },
      location: {
        value: {
          langitute: regionState.latitude,
          latitude: regionState.latitude,
        },
        isPublic: newLocation.isPublic,
        description: newLocation.value,
      },
    });
    navigation.navigate('Profile');
  }
  function chooseLocation() {
    setShowMap(false);
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
              setNewLocation({value: address, isPublic: newLocation.isPublic});
              Geocoder.from(address)
                .then(res => {
                  var location = res.results[0].geometry.location;
                  console.log(location);
                  setRegion({
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: regionState.latitudeDelta,
                    longitudeDelta: regionState.longitudeDelta,
                  });
                  setNewLocation({
                    value: address,
                    isPublic: newLocation.isPublic,
                  });
                })
                .catch(error => console.warn(error));
            }}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={address => {
              setAddress(address);
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
  function getLocation() {
    if ((newLocation.value = '' && location == '')) return 'Location...';
    else if (newLocation.value != '') return newLocation.value;
    else return location;
  }
  return oldProfileImage.value == '' ? (
    <View>
      <Text>oldProfileImage.value</Text>
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      {showMap ? (
        getMapView()
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Ionicons
                name="ios-arrow-back"
                size={24}
                color="#52575D"></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={updateUserSettings}>
              <Ionicons
                name="ios-arrow-forward"
                size={24}
                color="#52575D"></Ionicons>
            </TouchableOpacity>
          </View>

          <View style={{alignSelf: 'center'}}>
            <View style={styles.profileImage}>
              <Image
                source={{
                  uri: newProfileImage.value.uri
                    ? newProfileImage.value.uri
                    : oldProfileImage.value,
                }}
                style={styles.image}
                resizeMode="center"></Image>
            </View>
            <ToggleSwitch
              isOn={newProfileImage.isPublic}
              onColor="green"
              offColor="red"
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="small"
              onToggle={isOn =>
                setNewProfileImage({
                  value: newProfileImage.value,
                  isPublic: !newProfileImage.isPublic,
                })
              }
            />
            <View style={styles.add}>
              <TouchableOpacity onPress={handleUpload}>
                <Ionicons
                  name="add"
                  size={48}
                  color="#DFD8C8"
                  style={{marginTop: 6, marginLeft: 2}}></Ionicons>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text style={[styles.key, {color: '#AEB5BC', fontSize: 15}]}>
                User name:
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    fontWeight: '200',
                    fontSize: 36,
                    width: '80%',
                    paddingLeft: 35,
                  },
                ]}>
                {username}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text style={[styles.key, {color: '#AEB5BC', fontSize: 15}]}>
                Bio:
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TextInput
                  style={[
                    styles.text,
                    {fontWeight: '200', fontSize: 36, width: '80%'},
                  ]}
                  onChangeText={_bio => {
                    setNewBio({value: _bio, isPublic: newBio.isPublic});
                  }}
                  placeholder={bio == '' ? 'Bio...' : bio}></TextInput>
                <ToggleSwitch
                  isOn={newBio.isPublic}
                  onColor="green"
                  offColor="red"
                  labelStyle={{color: 'black', fontWeight: '900'}}
                  size="small"
                  onToggle={isOn =>
                    setNewBio({
                      value: newBio.value,
                      isPublic: !newBio.isPublic,
                    })
                  }
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text style={[styles.key, {color: '#AEB5BC', fontSize: 15}]}>
                Location:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  onPress={() => setShowMap(true)}
                  style={[
                    styles.text,
                    {fontWeight: '200', fontSize: 36, width: '80%'},
                  ]}>
                  {newLocation.value}
                </Text>
                <ToggleSwitch
                  isOn={newLocation.isPublic}
                  onColor="green"
                  offColor="red"
                  labelStyle={{color: 'black', fontWeight: '900'}}
                  size="small"
                  onToggle={isOn =>
                    setNewLocation({
                      value: newLocation.value,
                      isPublic: !newLocation.isPublic,
                    })
                  }
                />
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[styles.key, {color: '#AEB5BC', fontSize: 15}]}>
                Birthday:
              </Text>
              <View style={{flexDirection: 'row'}}>
                <DatePicker
                  mode="date"
                  date={new Date(birthday == '' ? null : birthday)}
                  style={{height: 100}}
                  onDateChange={date =>
                    setNewBirthday({
                      value: date,
                      isPublic: newBirthday.isPublic,
                    })
                  }
                />
                <ToggleSwitch
                  isOn={newBirthday.isPublic}
                  onColor="green"
                  offColor="red"
                  labelStyle={{color: 'black', fontWeight: '900'}}
                  size="small"
                  onToggle={isOn =>
                    setNewBirthday({
                      value: newBirthday.value,
                      isPublic: !newBirthday.isPublic,
                    })
                  }
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    textInputArea,
    width: '85%',
  },
  key: {
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
    width: 40,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  dm: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#34FFB9',
    position: 'absolute',
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: '#41444B',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  map: {
    position: 'absolute',
    top: 110,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mediaCount: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: '50%',
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.38)',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: '#CABFAB',
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
});
