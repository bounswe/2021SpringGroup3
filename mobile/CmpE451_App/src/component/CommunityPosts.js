import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {TEXT, PAGE_VARIABLES} from '../constants';
import * as Request from '../util/Requests';
import PostDetail from './PostDetail';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MessageList from '../component/MessageList';
import {COLORS} from '../theme/colors';
import MapView, {Marker} from 'react-native-maps';
import PostDetailComponent from '../component/PostDetail';
import {useNavigation} from '@react-navigation/native';

export default function CommunityPosts() {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  async function getPosts() {
    const _posts = await Request.getCommunityPosts(PAGE_VARIABLES.communityId);
    setPosts(_posts);
  }
  function navigateToPost(postId, communityId) {
    PAGE_VARIABLES.postId = postId;
    PAGE_VARIABLES.communityId = communityId;
    navigation.navigate('PostDetail', {isModerator: isModerator});
  }

  useEffect(() => {
    getPosts();
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPosts();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.feed}
        data={posts}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigateToPost(item.id, item.community.id)}>
            <PostDetailComponent
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
              postType={item.postType}
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBECF4',
  },
  feed: {
    marginHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    backgroundColor: COLORS.screenHeaderBackground,
    height: 55,
  },
});