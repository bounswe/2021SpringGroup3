import React from 'react';
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {list} from '../theme/styles';
import {listItem} from '../theme/styles';

export default function TabScreen({
  refreshing,
  onRefresh,
  communityList,
  onPress,
}) {
  return (
    <View style={styles.container}>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={communityList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              onPress(item);
            }}>
            <View style={list}>
              <Image source={{uri: item.iconUrl}} style={styles.image} />
              <Text style={listItem}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 30,
    height: 30,
  },
});
