import {View, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/colors';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import CommonIcon from './CommonIcon';

export default function SearchResultComponent({
  id,
  name,
  icon,
  description,
  isPrivate,
  onPress,
}) {
  return (
    <View style={{width:'100%'}}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.feedItem}>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'center'}}>
              <Image source={{uri: icon}} style={styles.avatar} />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.name}>{name}</Text>
            </View>
            {isPrivate && (
              <View style={{justifyContent: 'center'}}>
                <CommonIcon icon={'lock'} IconColor={'#36454F'} />
              </View>
            )}
          </View>
          <View>
            <Text style={styles.content}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 20,
    flexDirection: 'column',
    marginHorizontal: 8,
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
