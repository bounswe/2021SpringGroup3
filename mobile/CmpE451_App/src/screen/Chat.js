import React, {Component, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../component/Header';
import MessageList from '../component/MessageList';
import UnderConstruction from '../component/UnderConstruction';

export default function Message({navigation}) {
  const {container, headerBuble} = styles;
  return (
    <View style={container}>
      {/* <Image source={{uri:"https://drive.google.com/uc?export=view&id=1kQCyEbaR4_n7TjEddltSnR1sld6xcoAc"}} style={headerBuble} /> */}
      <UnderConstruction pageName="CHAT" />
    </View>
  );
}

const data = [
  {
    uri: 'https://drive.google.com/uc?export=view&id=1gWuxzaJRQvaEmllvUXAlEf_ClgbD6YRD',
    name: 'Zeynep',
    message: 'Hello World',
    timestamp: 1636156949000,
  },
  {
    uri: 'https://www.suaytour.com/Content/images/default-profile.png',
    name: 'Kıymet',
    message: 'Hello Mars',
    timestamp: 1636156949000,
  },
  {
    uri: 'https://media-exp1.licdn.com/dms/image/C4E03AQFUByr623ke5g/profile-displayphoto-shrink_400_400/0/1590683064023?e=1641427200&v=beta&t=oy8EWEnUHy58jbgxTz9_FqsGFyV-g6T2DqeY0Fyy7a0',
    name: 'Halil',
    message: 'Hello Jupiter',
    timestamp: 1636156949000,
  },
  {
    uri: 'https://drive.google.com/uc?export=view&id=1gWuxzaJRQvaEmllvUXAlEf_ClgbD6YRD',
    name: 'Zeynep',
    message: 'Hello World',
    timestamp: 1636156949000,
  },
  {
    uri: 'https://www.suaytour.com/Content/images/default-profile.png',
    name: 'Kıymet',
    message: 'Hello Mars',
    timestamp: 1636156949000,
  },
  {
    uri: 'https://media-exp1.licdn.com/dms/image/C4E03AQFUByr623ke5g/profile-displayphoto-shrink_400_400/0/1590683064023?e=1641427200&v=beta&t=oy8EWEnUHy58jbgxTz9_FqsGFyV-g6T2DqeY0Fyy7a0',
    name: 'Halil',
    message: 'Hello Jupiter',
    timestamp: 1636156949000,
  },
  {
    uri: 'https://drive.google.com/uc?export=view&id=1gWuxzaJRQvaEmllvUXAlEf_ClgbD6YRD',
    name: 'Zeynep',
    message: 'Hello World',
    timestamp: 1636156949000,
  },
  {
    uri: 'https://www.suaytour.com/Content/images/default-profile.png',
    name: 'Kıymet',
    message: 'Hello Mars',
    timestamp: 1636156949000,
  },
  {
    uri: 'https://media-exp1.licdn.com/dms/image/C4E03AQFUByr623ke5g/profile-displayphoto-shrink_400_400/0/1590683064023?e=1641427200&v=beta&t=oy8EWEnUHy58jbgxTz9_FqsGFyV-g6T2DqeY0Fyy7a0',
    name: 'Halil',
    message: 'Hello Jupiter',
    timestamp: 1636156949000,
  },
  {
    uri: 'https://drive.google.com/uc?export=view&id=1gWuxzaJRQvaEmllvUXAlEf_ClgbD6YRD',
    name: 'Zeynep',
    message: 'Hello World',
    timestamp: 1636156949000,
  },
  {
    uri: 'https://www.suaytour.com/Content/images/default-profile.png',
    name: 'Kıymet',
    message: 'Hello Mars',
    timestamp: 1636156949000,
  },
  {
    uri: 'https://media-exp1.licdn.com/dms/image/C4E03AQFUByr623ke5g/profile-displayphoto-shrink_400_400/0/1590683064023?e=1641427200&v=beta&t=oy8EWEnUHy58jbgxTz9_FqsGFyV-g6T2DqeY0Fyy7a0',
    name: 'Halil',
    message: 'Hello Jupiter',
    timestamp: 1636156949000,
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
