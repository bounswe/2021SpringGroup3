import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {list} from '../theme/styles';
import {listItem} from '../theme/styles';

export default function TabScreen({users, onPress}) {
  return (
    <View>
      {users.map(user => (
        <TouchableOpacity
          onPress={() => {
            if (onPress) {
              onPress(user);
            }
          }}>
          <View style={list}>
            <Image
              source={{uri: user.profilePhotoUrl.value}}
              style={styles.image}
            />
            <Text style={listItem}>{user.username}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingBottom: 0,
  },
  image: {
    width: 30,
    height: 30,
  },
});
