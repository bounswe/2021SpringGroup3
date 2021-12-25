import {View, Text} from 'react-native';
import React from 'react';
import moment from 'moment';
import {COLORS} from '../theme/colors';
import {Image, StyleSheet} from 'react-native';

export default function Comment({id, user, date, content}) {
  return (
    <View>
      <View style={styles.feedItem}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image source={{uri: user.profilePhotoUrl}} style={styles.avatar} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}>
                <Text style={{fontSize: 18, color: COLORS.textColor}}>
                  {user.username}
                </Text>
                <Text style={styles.timestamp}>{moment(date).fromNow()}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text>{content}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 20,
    flexDirection: 'column',
    marginVertical: 8,
    removeClippedSubviews: true,
  },
  commentContainer: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    flexDirection: 'column',
    marginVertical: 8,
    removeClippedSubviews: true,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  fieldName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
  map: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    width: 180,
  },
  marker: {
    height: 48,
    width: 48,
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
});
