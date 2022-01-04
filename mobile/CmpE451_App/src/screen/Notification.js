import React, {Component, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import NotificationList from '../component/NotificationList';
import UnderConstruction from '../component/UnderConstruction';
import * as Request from '../services/BoxyClient';

export default function Notification({navigation}) {
  const {container, headerBuble} = styles;
  const [data, setData] = useState();
  const [refreshing, setRefreshing] = useState(true);

  async function getNotifications() {
    const response = await Request.getNotifications();
    setData(response?.data);
    setRefreshing(false);
  }
  useEffect(() => {
    getNotifications();
  }, []);

  function deleteNotification() {
    console.log('@@@@@ deleted @@@@');
  }
  return (
    <View style={container}>
      <NotificationList
        data={data}
        onRefresh={getNotifications}
        refreshing={refreshing}
        deleteNotification={deleteNotification}
      />
    </View>
  );
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#EBECF4',
  },
  headerBuble: {
    width: wp('100%'),
    height: wp('60%'),
    position: 'absolute',
  },
};
