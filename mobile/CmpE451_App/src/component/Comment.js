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
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.name}>{user.username}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.timestamp}>{moment(date).fromNow()}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.content}>{content}</Text>
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
    marginVertical: 4,
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
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  name: {
    color: '#808080',
    marginHorizontal: 10,
    fontWeight: '500',
  },
  content: {
    color: COLORS.textColor,
    fontSize: 16,
    marginTop: 5,
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
  },
});
