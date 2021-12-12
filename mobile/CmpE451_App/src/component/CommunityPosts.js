import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {TEXT, PAGE_VARIABLES} from '../constants';
import * as Request from '../util/Requests';
import Postlist from '../component/PostList';

export default function CommunityPosts({}) {
  const [posts, setPosts] = useState([]);
  useEffect(async () => {
    const _posts = await Request.getCommunityPosts(PAGE_VARIABLES.communityId);
    setPosts(_posts);
  }, []);
  return <Postlist posts={posts}></Postlist>;
}
