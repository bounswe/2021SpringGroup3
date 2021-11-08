import React from 'react';
import {Animated, StyleSheet, Text, View, I18nManager} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RectButton} from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function StyleSwipeableRow(props) {
  const renderRightAction = progress => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [192, 0],
    });
    return (
      <Animated.View
        style={{
          borderRadius: 10,
          flex: 1,
          transform: [{translateX: trans}],
          borderBottomWidth: 0,
          borderColor: '#ffff',
          shadowColor: '#ffff',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.8,
          shadowRadius: 60,
          elevation: 30,
          marginRight: 15,
        }}>
        <View style={styles.totalaction}>
          <RectButton
            style={[styles.leftAction, {backgroundColor: '#ffff'}]}
            onPress={() => console.log('@@@@@@@')}>
            <Ionicons
              name={'trash'}
              style={{marginTop: hp('1%'), marginBottom: hp('1%')}}
              size={25}
              color={'#fc9d57'}
            />

            <Text style={styles.actionText}>Sil</Text>
          </RectButton>
        </View>
      </Animated.View>
    );
  };

  const renderRightActions = progress => (
    <View
      style={{
        width: 70,
        shadowColor: '#000',
        flexDirection: 'row',
      }}>
      {renderRightAction(progress)}
    </View>
  );

  const {children} = props;
  return (
    <Swipeable
      friction={1}
      leftThreshold={10}
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  actionText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#282828',
    marginBottom: hp('1%'),
  },
  leftAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: hp('1%'),
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    shadowOffset: {
      width: 3,
      height: 2,
    },
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: hp('1%'),
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  totalaction: {
    padding: 10,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginTop: hp('1%'),
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
