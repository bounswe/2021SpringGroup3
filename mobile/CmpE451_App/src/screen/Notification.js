import React, {Component, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import NotificationList from '../component/NotificationList';
import UnderConstruction from '../component/UnderConstruction';

export default function Notification({navigation}) {
  const {container, headerBuble} = styles;
  return (
    <View style={container}>
      {/* <Image source={{uri:"https://drive.google.com/uc?export=view&id=1kQCyEbaR4_n7TjEddltSnR1sld6xcoAc"}} style={headerBuble} /> */}
      <UnderConstruction pageName="NOTIFICATION" />
    </View>
  );
}

const data = [
  {
    uri: 'https://drive.google.com/uc?export=view&id=1kQCyEbaR4_n7TjEddltSnR1sld6xcoAc',
    name: 'r/gaming',
    timestamp: 1636156949000,
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://drive.google.com/uc?export=view&id=1kQCyEbaR4_n7TjEddltSnR1sld6xcoAc',
    name: 'Bümed',
    timestamp: 1636156949000,
    message: 'Bümed başarı bursları açıklandı',
  },
  {
    uri: 'https://drive.google.com/uc?export=view&id=1kQCyEbaR4_n7TjEddltSnR1sld6xcoAc',
    name: 'r/gaming',
    timestamp: 1636156949000,
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://drive.google.com/uc?export=view&id=1kQCyEbaR4_n7TjEddltSnR1sld6xcoAc',
    name: 'Bümed',
    timestamp: 1636156949000,

    message: 'Bümed başarı bursları açıklandı',
  },
  {
    uri: 'https://drive.google.com/uc?export=view&id=1kQCyEbaR4_n7TjEddltSnR1sld6xcoAc',
    name: 'r/gaming',
    timestamp: 1636156949000,
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://drive.google.com/uc?export=view&id=1kQCyEbaR4_n7TjEddltSnR1sld6xcoAc',
    name: 'Bümed',
    timestamp: 1636156949000,
    message: 'Bümed başarı bursları açıklandı',
  },
  {
    uri: 'https://drive.google.com/uc?export=view&id=1kQCyEbaR4_n7TjEddltSnR1sld6xcoAc',
    name: 'r/gaming',
    timestamp: 1636156949000,
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://drive.google.com/uc?export=view&id=1kQCyEbaR4_n7TjEddltSnR1sld6xcoAc',
    name: 'Bümed',
    timestamp: 1636156949000,
    message: 'Bümed başarı bursları açıklandı',
  },
  {
    uri: 'https://drive.google.com/uc?export=view&id=1kQCyEbaR4_n7TjEddltSnR1sld6xcoAc',
    name: 'r/gaming',
    timestamp: 1636156949000,
    message: '2022 is shaping up to be good year for gaming',
  },
  {
    uri: 'https://drive.google.com/uc?export=view&id=1kQCyEbaR4_n7TjEddltSnR1sld6xcoAc',
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