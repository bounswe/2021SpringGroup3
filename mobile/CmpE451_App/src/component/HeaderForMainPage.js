import React, {Component} from 'react';
import {SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Search from '../component/SearchBar';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();
  const {container, headerText, photo, iconView} = styles;
  return (
    <SafeAreaView style={container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          style={photo}
          source={{
            uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
          }}
        />
      </TouchableOpacity>
      <Search></Search>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <View style={iconView}>
          <Ionicons name={'bell'} size={20} color={'#fff'} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    width: wp('90%'),
    margin: 20,
    marginBottom: hp('0.5%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  photo: {
    width: wp('11.3%'),
    height: wp('11.3%'),
    borderRadius: wp('14.3%') / 2,
    borderColor: '#ce6f24',
    borderWidth: 3,
  },

  headerText: {
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 25,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: 'black',
    marginTop: 10,
  },
  iconView: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('13%') / 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
