import React from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';

import {list} from '../theme/styles';
import {listItem} from '../theme/styles';
import CommonIcon from './CommonIcon';

export default function UserList({users, onPress, icons = []}) {
  return (
    <View>
      {users.map(user => (
        <View style={list}>
          {icons.map(icon => (
            <CommonIcon
              icon={user.isMod ? 'crown' : icon.name}
              onPress={() => {
                if (!user.isMod) {
                  icon.onPress(user.id);
                }
              }}
              IconColor={icon.iconColor}
            />
          ))}
          <Image source={{uri: user.profilePhotoUrl}} style={styles.image} />
          <Text
            style={listItem}
            onPress={() => {
              if (onPress) {
                onPress(user);
              }
            }}>
            {user.username}
          </Text>
        </View>
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
