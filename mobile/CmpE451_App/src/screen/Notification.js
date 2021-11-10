import React, {Component, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import NotificationList from '../component/NotificationList';
export default function Notification({navigation}) {
  const {container, headerBuble} = styles;
  return (
    <View style={container}>
      {/* <Image source={{uri:"https://www.astajans.com/Upload/urunler-upload/img_96.png"}} style={headerBuble} /> */}
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
    timestamp: 1636156949000,
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'Bümed',
    timestamp: 1636156949000,
    message: 'Bümed başarı bursları açıklandı',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'r/gaming',
    timestamp: 1636156949000,
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'Bümed',
    timestamp: 1636156949000,

    message: 'Bümed başarı bursları açıklandı',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'r/gaming',
    timestamp: 1636156949000,
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'Bümed',
    timestamp: 1636156949000,
    message: 'Bümed başarı bursları açıklandı',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'r/gaming',
    timestamp: 1636156949000,
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'Bümed',
    timestamp: 1636156949000,
    message: 'Bümed başarı bursları açıklandı',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'r/gaming',
    timestamp: 1636156949000,
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
    name: 'Bümed',
    timestamp: 1636156949000,
    message: 'Bümed başarı bursları açıklandı',
  },
];
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
