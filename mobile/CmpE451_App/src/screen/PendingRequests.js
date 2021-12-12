import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, ToastAndroid, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserList from '../component/UserList';
import ScreenHeader from '../component/ScreenHeader';
import {headerTextStyle} from '../theme/styles';
import * as client from '../services/BoxyClient';

export default function PendingRequests({navigation, route}) {
  const Tab = createMaterialTopTabNavigator();
  let {pendingMembers, communityId} = route.params;
  const [pendingMemberList, setPendingMemberList] = useState(pendingMembers);

  function applyQuery(id) {
    pendingMembers = pendingMembers.filter(function (member) {
      return member.id !== id;
    });
    setPendingMemberList(pendingMembers);
  }

  async function acceptPendingMember(userId) {
    let response = await client.acceptJoinRequest({
      communityId: communityId,
      userId: userId,
    });
    if (response.status === 200) {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      applyQuery(userId);
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
      applyQuery(userId);
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
