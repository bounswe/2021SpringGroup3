import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';

import {headerStyle} from '../theme/styles';
import {headerContainerStyle} from '../theme/styles';
import {COLORS} from '../theme/colors';
import CloseButton from '../component/CloseButton';
import {IconButton} from 'react-native-paper';
import {Button} from 'react-native-elements';
import {PAGE_VARIABLES} from '../constants';
import * as Client from '../services/BoxyClient';

export default function Community({navigation}) {
  const Tab = createMaterialTopTabNavigator();

  const [iconUrl, setIconUrl] = useState('g');
  const [name, setName] = useState('');
  const [memberCount, setMemberCount] = useState(20);
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isModerator, setIsModerator] = useState(true);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchCommunityDetails() {
      let response = await Client.getCommunityDetail({
        communityId: PAGE_VARIABLES.communityId,
      });

      if (response.status === 200) {
        setIconUrl(response.data.iconUrl);
        setName(response.data.name);
        setDescription(response.data.description);
        setIsPrivate(response.data.isPrivate);
        setIsMember(response.data.isMember);
        setIsModerator(response.data.isModerator);
        setMemberCount(response.data.memberCount);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    }
    if (isFocused) {
      fetchCommunityDetails();
    }
  }, [isFocused]);

  useEffect(() => {
    async function resetStates() {
      setIconUrl('url');
      setName('');
      setDescription('');
      setIsPrivate(false);
      setIsMember(false);
      setIsModerator(false);
      setMemberCount(0);
    }
    if (!isFocused) {
      resetStates();
    }
  }, [navigation, isFocused]);

  async function fetchPosts() {}

  async function handleJoinCommunity() {}

  const navigate = async () => {
    navigation.navigate('Home');
  };

  function allCommunitesTab() {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <View style={headerContainerStyle}>
        <View style={headerStyle}>
          <Text style={{color: 'white', fontSize: 20}}>Communities</Text>
        </View>
        <CloseButton onPress={navigate} />
      </View>
      {isModerator && (
        <View style={styles.settingsContainer}>
          <IconButton icon="cog" size={25} color="white" />
        </View>
      )}
      <View style={styles.communityInfoHeader}>
        <View style={styles.imageContainer}>
          <Image source={{uri: iconUrl}} style={styles.image} />
        </View>
      </View>
      <View style={styles.section1}>
        <Text style={styles.communityName}>{name}</Text>
        {isMember ? (
          <Button
            title="Joined"
            type="outline"
            buttonStyle={styles.joinedButton}
            titleStyle={styles.joinedText}
          />
        ) : (
          <Button
            title="Join"
            buttonStyle={styles.joinButton}
            titleStyle={styles.joinText}
            icon={
              <IconButton
                icon="plus"
                size={13}
                color="white"
                style={{margin: 0}}
              />
            }
          />
        )}
      </View>
      <View style={styles.section2}>
        <Text style={styles.text}>{memberCount} Members</Text>
      </View>
      <Text style={styles.text}>{description}</Text>
      <Tab.Navigator>
        <Tab.Screen key={'tab-1'} name={'Posts'} component={allCommunitesTab} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  communityName: {
    color: COLORS.textColor,
    fontSize: 25,
    marginHorizontal: 5,
    marginTop: 10,
  },
  text: {
    color: COLORS.inputTextColor,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  imageContainer: {
    width: 110,
    height: 110,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: COLORS.fieldHeaderColor,
    marginVertical: 12,
    marginHorizontal: 5,
  },
  communityInfoHeader: {
    width: '100%',
    backgroundColor: COLORS.fieldHeaderColor,
    paddingTop: 40,
  },
  settingsContainer: {
    width: '100%',
    backgroundColor: COLORS.fieldHeaderColor,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  section1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
  },
  section2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  editIconContainer: {
    borderColor: COLORS.buttonColor,
    backgroundColor: 'white',
    borderWidth: 3,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinedButton: {
    borderColor: COLORS.buttonColor,
    borderRadius: 20,
    height: 25,
    width: 70,
    paddingVertical: 0,
  },
  joinedText: {
    color: COLORS.buttonColor,
    fontSize: 10,
    margin: 0,
    paddingVertical: 0,
  },
  joinButton: {
    borderColor: COLORS.buttonColor,
    backgroundColor: COLORS.buttonColor,
    borderRadius: 20,
    height: 25,
    width: 70,
    paddingVertical: 0,
  },
  joinText: {
    color: COLORS.buttonTextColor,
    fontSize: 10,
    margin: 0,
    paddingVertical: 0,
  },
});
