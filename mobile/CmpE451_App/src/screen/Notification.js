import React, {Component, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../component/NotificationPageHeader';
import NotificationList from '../component/NotificationList';
export default function Notification({navigation}) {
  const {container, headerBuble} = styles;
  return (
    <View style={container}>
      {/* <Image source={{uri:"https://www.astajans.com/Upload/urunler-upload/img_96.png"}} style={headerBuble} /> */}
      <Header text="Bildirimler" />
      <View style={{shadowColor: 'black'}}>
        <NotificationList
          data={data}
          navigation={navigation}
          user={'userData'}
          id={'id'}
        />
      </View>
    </View>
  );
}

const data = [
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'r/gaming',
    time:"12h",
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'Bümed',
    time:"3d",
    message: 'Bümed başarı bursları açıklandı',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'r/gaming',
    time:"12h",
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'Bümed',
    time:"3d",
    message: 'Bümed başarı bursları açıklandı',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'r/gaming',
    time:"12h",
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'Bümed',
    time:"3d",
    message: 'Bümed başarı bursları açıklandı',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'r/gaming',
    time:"12h",
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'Bümed',
    time:"3d",
    message: 'Bümed başarı bursları açıklandı',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'r/gaming',
    time:"12h",
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'Bümed',
    time:"3d",
    message: 'Bümed başarı bursları açıklandı',
  },
];
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  headerBuble: {
    width: wp('100%'),
    height: wp('60%'),
    position: 'absolute',
  },
};
