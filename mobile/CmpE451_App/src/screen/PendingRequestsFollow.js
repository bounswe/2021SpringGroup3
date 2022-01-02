import React, {useState} from 'react';
import {Text, StyleSheet, ToastAndroid, View} from 'react-native';
import UserList from '../component/UserList';
import ScreenHeader from '../component/ScreenHeader';
import {headerTextStyle} from '../theme/styles';
import * as client from '../services/BoxyClient';

export default function PendingRequestsFollow({navigation, route}) {

  let {pendingFollowerList} = route.params;
  const [pendingFollowers, setPendingFollowers] = useState(pendingFollowerList);

  async function acceptPendingFollower(userId) {
    let response = await client.acceptFollowRequest({
      userId: userId,
    });
    if (response.status === 200) {
      //ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      setPendingFollowers(response.data.pendingFollowers);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  }

  async function rejectPendingFollower(userId) {
    let response = await client.rejectFollowRequest({
      userId: userId,
    });
    if (response.status === 200) {
      //ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      setPendingFollowers(response.data.pendingFollowers);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        titleComponent={<Text style={headerTextStyle}>Pending Follower Requests</Text>}
        iconName="arrow-left-circle"
        navigate={navigation.goBack}
      />
      <UserList
        users={pendingFollowers}
        icons={[
          {
            name: 'check-circle-outline',
            iconColor: 'green',
            onPress: acceptPendingFollower,
          },
          {
            name: 'close-circle-outline',
            iconColor: 'red',
            onPress: rejectPendingFollower,
          },
        ]}
      />
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
