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

export default function CommunityPosts({}) {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  async function getPosts() {
    const _posts = await Request.getCommunityPosts(PAGE_VARIABLES.communityId);
    setPosts(_posts);
  }
  useEffect(() => {
    getPosts();
  }, []);
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
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFF',
//     borderRadius: 5,
//     padding: 8,
//     flexDirection: 'row',
//     marginVertical: 8,
//   },
//   feedItem: {
//     backgroundColor: '#FFF',
//     borderRadius: 5,
//     padding: 20,
//     flexDirection: 'column',
//     marginVertical: 8,
//     minHeight: '100%',
//     removeClippedSubviews: true,
//   },
//   avatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     marginRight: 16,
//   },
//   fieldName: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#454D65',
//     fontWeight: 'bold',
//   },
//   content: {
//     flexWrap: 'wrap',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   timestamp: {
//     fontSize: 11,
//     color: '#C4C6CE',
//     marginTop: 4,
//   },
//   map: {
//     position: 'absolute',
//     top: 10,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     width: 250,
//   },
//   marker: {
//     height: 48,
//     width: 48,
//   },
//   region: {
//     color: '#fff',
//     lineHeight: 20,
//     margin: 20,
//   },
//   header: {
//     paddingTop: 64,
//     paddingBottom: 16,
//     backgroundColor: '#FFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#EBECF4',
//     shadowColor: '#454D65',
//     shadowOffset: {height: 5},
//     shadowRadius: 15,
//     shadowOpacity: 0.2,
//     zIndex: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '500',
//   },
//   feed: {
//     marginHorizontal: 16,
//   },
//   feedItem: {
//     backgroundColor: '#FFF',
//     borderRadius: 5,
//     padding: 8,
//     flexDirection: 'row',
//     marginVertical: 8,
//   },
//   avatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     marginRight: 16,
//   },
//   name: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#454D65',
//     padding: 4,
//   },
//   timestamp: {
//     fontSize: 11,
//     color: '#C4C6CE',
//     marginTop: 4,
//   },
//   post: {
//     marginTop: 16,
//     fontSize: 14,
//     color: '#838899',
//   },
//   postImage: {
//     width: undefined,
//     height: 150,
//     borderRadius: 5,
//     marginVertical: 16,
//   },
//   header: {
//     paddingTop: 64,
//     paddingBottom: 16,
//     backgroundColor: '#FFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#EBECF4',
//     shadowColor: '#454D65',
//     shadowOffset: {height: 5},
//     shadowRadius: 15,
//     shadowOpacity: 0.2,
//     zIndex: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '500',
//   },
//   feed: {
//     width: wp('90%'),
//     height: wp('60%'),
//     borderRadius: 10,
//     backgroundColor: '#ffffff',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.07,
//     shadowRadius: 7,
//     elevation: 5,
//     flexDirection: 'row',
//     marginLeft: 20,
//     marginTop: hp('2%'),
//   },
//   feedItem: {
//     backgroundColor: '#FFF',
//     borderRadius: 5,
//     padding: 8,
//     flexDirection: 'row',
//     marginVertical: 8,
//   },
//   avatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     marginRight: 16,
//   },
//   name: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#454D65',
//   },
//   timestamp: {
//     fontSize: 11,
//     color: '#C4C6CE',
//     marginTop: 4,
//   },
//   post: {
//     marginTop: 16,
//     fontSize: 14,
//     color: '#838899',
//   },
//   postImage: {
//     width: undefined,
//     height: 150,
//     borderRadius: 5,
//     marginVertical: 16,
//   },
// });
