import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import StyleSwipeableRow from './SwipleableRowForNotification';

export default function Dragable({data, navigation, user, id}) {
  function gotoRoom(){
    console.log(">>>>>>>>>>>>>>>>>")
  }
  const SwipeableRow = ({item}) => {
    return (
      <StyleSwipeableRow style={styles.SwipeableRow}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => gotoRoom(item)}>
          <Image
            style={styles.photo}
            source={{
              uri: item.uri,
            }}
          />
          <View style={{marginLeft: 10, width: wp('63%')}}>
            <View style={{justifyContent:"flex-start",flexDirection:'row'}}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text>  </Text>
            <Text style={styles.nameText}>{item.time}</Text>
            </View>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
          <Text style={styles.timeText}>{item.minute}</Text>
        </TouchableOpacity>
      </StyleSwipeableRow>
    );
  };

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item, index}) => <SwipeableRow item={item} index={index} />}
      keyExtractor={(item, index) => `message ${index}`}
    />
  );
}
const styles = StyleSheet.create({
  SwipeableRow: {
    borderBottomColor: '#ffff',
    borderColor:'#ffff'
  },
  timeText: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: '#474747',
    marginTop: -35,
    marginLeft: -10,
  },
  messageAdet: {
    color: '#4202b9',
    textAlign: 'center',
    marginTop: wp('4%'),
    width: wp('8%'),
    height: wp('4.8%'),
    borderRadius: 6,
    backgroundColor: '#ece6f8',
    marginLeft: wp('-7%'),
  },
  nameText: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000',
    marginTop: -2,
  },
  container: {
    width: wp('91%'),
    height: wp('17%'),
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginLeft: 20,
    borderColor: '#ffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 10,
    shadowOpacity: 0.15,
    shadowRadius: 7,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  horoscopeView: {
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 5,
  },
  horoscopeText: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000',
    marginTop: 5,
    marginLeft: 5,
  },
  forwardText: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 13.3,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#89898d',
  },
  photo: {
    width: wp('17.5%'),
    height: wp('17.5%'),
    borderRadius: wp('17.5%') / 2,
    borderWidth: 3,
    marginLeft: 5,
  },
  matchRateText: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000',
  },
  separator: {
    borderRadius: 10,
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});
