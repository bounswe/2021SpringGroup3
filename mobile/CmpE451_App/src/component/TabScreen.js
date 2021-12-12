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
import {COLORS} from '../theme/colors';

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
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: COLORS.fieldHeaderColor,
    marginVertical: 12,
    marginHorizontal: 5,
  },
});
