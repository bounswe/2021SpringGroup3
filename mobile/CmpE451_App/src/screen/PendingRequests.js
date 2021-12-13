import React, {useState} from 'react';
import {Text, StyleSheet, ToastAndroid, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserList from '../component/UserList';
import ScreenHeader from '../component/ScreenHeader';
import {headerTextStyle} from '../theme/styles';
import * as client from '../services/BoxyClient';

export default function PendingRequests({navigation, route}) {
  const Tab = createMaterialTopTabNavigator();
  let {pendingMembers, communityId, pendingModerators} = route.params;
  const [pendingMemberList, setPendingMemberList] = useState(pendingMembers);
  const [pendingModeratorList, setPendingModeratorList] =
    useState(pendingModerators);

  async function acceptPendingMember(userId) {
    let response = await client.acceptJoinRequest({
      communityId: communityId,
      userId: userId,
    });
    if (response.status === 200) {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      setPendingMemberList(response.data.pendingMembers);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  }

  async function rejectPendingMember(userId) {
    let response = await client.rejectJoinRequest({
      communityId: communityId,
      userId: userId,
    });
    if (response.status === 200) {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      setPendingMemberList(response.data.pendingMembers);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  }

  async function acceptPendingModerator(userId) {
    let response = await client.acceptJoinModeratorsRequest({
      communityId: communityId,
      userId: userId,
    });
    if (response.status === 200) {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      setPendingModeratorList(response.data.pendingMembers);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  }

  async function rejectPendingModerator(userId) {
    let response = await client.rejectJoinModeratorsRequest({
      communityId: communityId,
      userId: userId,
    });
    if (response.status === 200) {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      setPendingModeratorList(response.data.pendingMembers);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  }

  function joinCommunityRequestsTab() {
    return (
      <UserList
        users={pendingMemberList}
        icons={[
          {
            name: 'check-circle-outline',
            iconColor: 'green',
            onPress: acceptPendingMember,
          },
          {
            name: 'close-circle-outline',
            iconColor: 'red',
            onPress: rejectPendingMember,
          },
        ]}
      />
    );
  }

  function joinModeratorsRequestsTab() {
    return (
      <UserList
        users={pendingModeratorList}
        icons={[
          {
            name: 'check-circle-outline',
            iconColor: 'green',
            onPress: acceptPendingModerator,
          },
          {
            name: 'close-circle-outline',
            iconColor: 'red',
            onPress: rejectPendingModerator,
          },
        ]}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        titleComponent={<Text style={headerTextStyle}>Pending Requests</Text>}
        iconName="arrow-left-circle"
        navigate={navigation.goBack}
      />
      <Tab.Navigator>
        <Tab.Screen
          key={'tab-1'}
          name={'Join Requests'}
          component={joinCommunityRequestsTab}
        />
        <Tab.Screen
          key={'tab-2'}
          name={'Moderator Requests'}
          component={joinModeratorsRequestsTab}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
