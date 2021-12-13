import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import UnderConstruction from '../component/UnderConstruction';
import * as Request from '../services/BoxyClient';
import {
  TEXT,
  PAGE_VARIABLES,
  BASE_URL,
  DEFAULT_PROFILE_IMAGE,
} from '../constants';
import Loader from '../component/Loader';

export default function OtherUserProfile({id}) {
  const navigation = useNavigation();
  const [bio, setBio] = useState();
  const [birthday, setBirthday] = useState();
  const [location, setLocation] = useState();
  const [profileImageUrl, setProfileImageUrl] = useState();
  const [username, setUsername] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const profile = await Request.getOtherProfile(id);
    setLocation(
      profile.location.isPublic ? profile.location.description : null,
    );
    setBio(profile.bio.isPublic ? profile.bio : null);
    setBirthday(profile.birthday.isPublic ? profile.birthday.value : null);
    setProfileImageUrl(
      profile.profilePhotoUrl.isPublic ? profile.profilePhotoUrl.value : null,
    );
    setUsername(profile.username);
    setIsLoading(false);
  }, [navigation]);

  return isLoading ? (
    <Loader loading={'loading'}></Loader>
  ) : (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back"
                size={24}
                color="#52575D"></Ionicons>
            </TouchableOpacity>
          </View>
          <View style={{alignSelf: 'center'}}>
            <View style={styles.profileImage}>
              <Image
                source={{
                  uri: profileImageUrl,
                }}
                style={styles.image}
                resizeMode="center"></Image>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.key, {color: '#AEB5BC', fontSize: 15}]}>
                User name:
              </Text>
              <Text style={[styles.text, {fontWeight: '200', fontSize: 36}]}>
                {username}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.key, {color: '#AEB5BC', fontSize: 15}]}>
                Bio:
              </Text>
              <Text style={[styles.text, {fontWeight: '200', fontSize: 36}]}>
                {bio != null ? bio : 'Private'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.key, {color: '#AEB5BC', fontSize: 15}]}>
                Location:
              </Text>
              <Text style={[styles.text, {fontWeight: '200', fontSize: 36}]}>
                {location != null ? location : 'Private'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.key, {color: '#AEB5BC', fontSize: 15}]}>
                Birthday:
              </Text>
              <Text style={[styles.text, {fontWeight: '200', fontSize: 36}]}>
                {birthday != null
                  ? birthday.substring(0, birthday.lastIndexOf(':') - 6)
                  : 'Private'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  key: {
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
  },
  text: {
    padding: 10,
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
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
    width: 100,
    height: 100,
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
    alignSelf: 'center',
    alignItems: 'center',
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
