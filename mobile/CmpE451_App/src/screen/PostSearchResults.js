import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  ToastAndroid,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS} from '../theme/colors';
import * as client from '../services/BoxyClient';
import {PAGE_VARIABLES} from '../constants';
import PostDetailComponent from '../component/PostDetail';
import CommonIcon from '../component/CommonIcon';
import {notFoundImg} from '../image/index';

export default function PostSearchResults({navigation, route}) {
  let {body, filterByPostType, filterByTags, sortBy} = route.params;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    searchCommunityHandler();
  }, []);

  const searchCommunityHandler = async () => {
    let response;
    if (!filterByPostType) {
      response = await client.searchPost({
        communityId: body.communityId,
        tag: body.tag,
        sortBy: sortBy,
      });
    } else {
      response = await client.advancedSearchPosts({body: body, sortBy: sortBy});
    }
    if (response.status === 200) {
      setSearchResults(response.data);
    } else {
      console.log(response.data.message);
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  };

  function navigateToPost(postId, communityId) {
    PAGE_VARIABLES.postId = postId;
    PAGE_VARIABLES.communityId = communityId;
    navigation.navigate('PostDetail');
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CommonIcon
          icon={'arrow-left-circle'}
          IconColor={'white'}
          onPress={navigation.goBack}
        />
        <View style={{flexDirection: 'row', flex: 4}}>
          <Text style={{color: 'white', fontSize: 20}}>Search Results</Text>
        </View>
      </View>
      {searchResults.length > 0 ? (
        <FlatList
          style={styles.feed}
          data={searchResults}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigateToPost(item.id, item.community.id)}>
              <PostDetailComponent
                Main={"Main"}
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
                showDelete={false}
              />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80%',
          }}>
          <Image source={notFoundImg} style={styles.image} />
          <Text style={{fontSize: 18}}>No Post Found </Text>
        </View>
      )}
    </View>
  );
}

const styles = {
  container: {flex: 1},
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
  feedItem: {
    width: '100%',
  },
  content: {
    color: COLORS.textColor,
    fontSize: 16,
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
};
