import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Post from '../component/Post';
import PostDetail from './PostDetail';
export default function Postlist({posts}) {
  return posts.length > 0 ? (
    <FlatList
      style={styles.feed}
      data={posts}
      renderItem={({item}) => (
        <PostDetail
          user={item.user}
          date={item.date}
          community={item.community}
          textFieldNames={item.textFieldNames}
          numberFieldNames={item.numberFieldNames}
          dateFieldNames={item.dateFieldNames}
          linkFieldNames={item.linkFieldNames}
          locationFieldNames={item.locationFieldNames}
          isLiked={item.isLiked}
          likeCount={item.likeCount}
        />
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}></FlatList>
  ) : (
    <View></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    marginHorizontal: 16,
    marginVertical: 10,
    height: '100%',
  },
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: '#838899',
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
