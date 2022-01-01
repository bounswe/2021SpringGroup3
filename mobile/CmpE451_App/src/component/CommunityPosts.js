import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {PAGE_VARIABLES} from '../constants';
import * as Request from '../util/Requests';
import PostDetail from './PostDetail';

export default function CommunityPosts({onPress}) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const _posts = await Request.getCommunityPosts(
        PAGE_VARIABLES.communityId,
      );
      setPosts(_posts);
    }
    getPosts();
  }, []);

  return (
    <FlatList
      data={posts}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => onPress(item.id)}>
          <PostDetail
            id={item.id}
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
            commentCount={item.commentCount}
            tags={item.tags}
          />
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
}
