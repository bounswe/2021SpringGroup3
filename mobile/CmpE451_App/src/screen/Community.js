import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  ToastAndroid,
  Alert,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';
import {COLORS} from '../theme/colors';
import {listItem} from '../theme/styles';
import ScreenHeader from '../component/ScreenHeader';
import {IconButton} from 'react-native-paper';
import {Button} from 'react-native-elements';
import {PAGE_VARIABLES} from '../constants';
import * as client from '../services/BoxyClient';
import UserList from '../component/UserList';
import CommunityPosts from '../component/CommunityPosts';
import MessageList from '../component/MessageList';

export default function Community({navigation}) {
  const Tab = createMaterialTopTabNavigator();

  const [iconUrl, setIconUrl] = useState('g');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [members, setMembers] = useState([]);
  const [moderators, setModerators] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [pendingModerators, setPendingModerators] = useState([]);

  const [isPrivate, setIsPrivate] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isPendingMember, setIsPendingMember] = useState(false);
  const [isPendingModerator, setIsPendingModerator] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchCommunityDetails() {
      let response = await client.getCommunityDetail({
        communityId: PAGE_VARIABLES.communityId,
      });

      if (response.status === 200) {
        setIconUrl(response.data.iconUrl);
        setName(response.data.name);
        setDescription(response.data.description);
        setMembers(response.data.members);
        setModerators(response.data.moderators);
        setPendingMembers(response.data.pendingMembers);
        setPendingModerators(response.data.pendingModerators);
        setIsPrivate(response.data.isPrivate);
        setIsMember(response.data.isMember);
        setIsModerator(response.data.isModerator);
        setIsPendingMember(response.data.isPendingMember);
        setIsPendingModerator(response.data.isPendingModerator);
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
      setMembers([]);
      setModerators([]);
      setPendingMembers([]);
      setPendingModerators([]);
      setIsPrivate(false);
      setIsMember(false);
      setIsModerator(false);
      setIsPendingMember(false);
      setIsPendingModerator(false);
    }
    if (!isFocused) {
      resetStates();
    }
  }, [navigation, isFocused]);

  async function fetchPosts() {}

  async function handleJoinCommunity() {
    let response = await client.joinCommunity({
      communityId: PAGE_VARIABLES.communityId,
    });
    if (response.status === 200) {
      setIsMember(response.data.isMember);
      setIsPendingMember(response.data.isPendingMember);
      setIsModerator(response.data.isModerator);
      setMembers(response.data.members);
      setModerators(response.date.moderators);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  }

  async function handleLeaveCommunity() {
    let response = await client.leaveCommunity({
      communityId: PAGE_VARIABLES.communityId,
    });
    if (response.status === 200) {
      setIsMember(response.data.isMember);
      setIsPendingMember(response.data.isPendingMember);
      setIsModerator(response.data.isModerator);
      setMembers(response.data.members);
      setModerators(response.data.moderators);
      setIsPendingMember(response.data.isPendingModerator);
      setPendingModerators(response.data.pendingModerators);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  }

  async function handleKickMember(userId) {
    let response = await client.kickMember({
      communityId: PAGE_VARIABLES.communityId,
      userId: userId,
    });
    if (response.status === 200) {
      setIsMember(response.data.isMember);
      setIsPendingMember(response.data.isPendingMember);
      setIsModerator(response.data.isModerator);
      setMembers(response.data.members);
      setModerators(response.data.moderators);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  }

  async function handleApplyModerator() {
    let response = await client.joinModerators({
      communityId: PAGE_VARIABLES.communityId,
    });
    if (response.status === 200) {
      setIsPendingModerator(response.data.isPendingModerator);
      setPendingModerators(response.data.pendingModerators);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  }

  const showLeaveCommunityAlert = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to leave the community?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes',
          onPress: () => handleLeaveCommunity(),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  function showKickMemberAlert(userId) {
    Alert.alert(
      'Warning',
      'Are you sure you want to kick the member from the community?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes',
          onPress: () => handleKickMember(userId),
        },
      ],
      {
        cancelable: true,
      },
    );
  }

  function showApplyModeratorAlert() {
    Alert.alert(
      'Warning',
      'Are you sure you want to apply to be a moderator?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes',
          onPress: () => handleApplyModerator(),
        },
      ],
      {
        cancelable: true,
      },
    );
  }

  const navigate = async () => {
    navigation.navigate('Main');
  };
  function CommunityPostsTab() {
    return <CommunityPosts />;
  }
  const navigatePendingRequests = () => {
    navigation.navigate('PendingRequests', {
      pendingMembers: pendingMembers,
      pendingModerators: pendingModerators,
      communityId: PAGE_VARIABLES.communityId,
    });
  };
  const navigateUpdateCommunity = () => {
    navigation.navigate('UpdateCommunity', {
      name: name,
      iconUrl: iconUrl,
      description: description,
      isPrivate: isPrivate,
    });
  };

  function selectUser(user) {
    navigation.navigate('OtherUserProfile', {id: user.id});
  }
  function aboutTab() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionText}>About us</Text>
          </View>
          <Text style={listItem}>
            This is a {isPrivate ? 'private' : 'public'} community!
          </Text>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionText}>Moderators</Text>
          </View>
          <UserList users={moderators} />
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionText}>Need help?</Text>
          </View>
          <Text style={listItem}>Message the moderators</Text>
        </View>
      </ScrollView>
    );
  }
  function membersTab() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionText}>Members</Text>
        </View>
        <UserList
          onPress={selectUser}
          users={members}
          icons={
            isModerator
              ? [
                  {
                    name: 'karate',
                    iconColor: COLORS.buttonColor,
                    onPress: showKickMemberAlert,
                  },
                ]
              : []
          }
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScreenHeader title="Communities" navigate={navigate} />
      {isModerator && (
        <View style={styles.rightIconContainer}>
          <View style={{flexDirection: 'row'}}>
            <IconButton
              icon="bell"
              onPress={() => navigatePendingRequests()}
              size={22}
              color="white"
              style={{marginHorizontal: 0}}
            />
            <IconButton
              icon="cog"
              size={22}
              color="white"
              onPress={() => navigateUpdateCommunity()}
              style={{marginHorizontal: 3}}
            />
          </View>
        </View>
      )}
      <View style={styles.communityInfoHeader}>
        <View style={styles.imageContainer}>
          <Image source={{uri: iconUrl}} style={styles.image} />
        </View>
      </View>
      <View style={styles.section1}>
        <Text style={styles.communityName}>{name}</Text>
        <View style={{alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {isModerator && (
              <IconButton
                icon="crown"
                size={28}
                color={COLORS.buttonColor}
                style={{margin: 0}}
              />
            )}
            {!isModerator && !isPendingModerator && (
              <IconButton
                icon="crown-outline"
                onPress={showApplyModeratorAlert}
                size={28}
                color={COLORS.buttonColor}
                style={{margin: 0}}
              />
            )}
            {isPendingModerator && (
              <IconButton
                icon="crown-outline"
                size={28}
                color="#FAD02C"
                style={{margin: 0}}
              />
            )}
            {isMember || isPendingMember ? (
              <Button
                title={isMember ? 'Joined' : 'Pending'}
                type="outline"
                buttonStyle={styles.joinedButton}
                titleStyle={styles.joinedText}
                onPress={() => {
                  if (isMember) {
                    showLeaveCommunityAlert();
                  }
                }}
              />
            ) : (
              <Button
                title="Join"
                buttonStyle={styles.joinButton}
                titleStyle={styles.joinText}
                onPress={handleJoinCommunity}
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
        </View>
      </View>
      <View style={styles.section2}>
        <Text style={styles.text}>{members.length} Members</Text>
      </View>
      <Text style={styles.text}>{description}</Text>
      <Tab.Navigator>
        <Tab.Screen
          key={'tab-1'}
          name={'Posts'}
          component={CommunityPostsTab}
        />
        <Tab.Screen key={'tab-2'} name={'About'} component={aboutTab} />
        <Tab.Screen key={'tab-2'} name={'Members'} component={membersTab} />
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
  rightIconContainer: {
    width: '100%',
    backgroundColor: COLORS.fieldHeaderColor,
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
  sectionHeaderContainer: {
    backgroundColor: '#dddddd',
    padding: 10,
  },
  sectionText: {
    color: '#555555',
    fontSize: 13,
    fontWeight: '500',
  },
});