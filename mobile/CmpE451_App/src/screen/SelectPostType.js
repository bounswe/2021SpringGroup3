import React, {useState, useEffect} from 'react';
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {TEXT, PAGE_VARIABLES, BASE_URL} from '../constants';
import {getToken} from '../services/asyncStorageService';
import {postTypeIcon} from '../image/index';
import {list} from '../theme/styles';
import {listItem} from '../theme/styles';
import {headerTextStyle} from '../theme/styles';
import ScreenHeader from '../component/ScreenHeader';

export default function SelectPostType({navigation, route}) {
  const {communityName, communityId} = route.params;
  const [postTypeList, setPostTypeList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPostTypes();
  }, []);

  const _onRefresh = () => {
    setRefreshing(true);
    getPostTypes();
    setRefreshing(false);
  };

  const navigateCreatePost = selectedPostTypeId => {
    PAGE_VARIABLES.postTypeId = selectedPostTypeId.id;
    navigation.navigate('CreatePost', {
      communityName: communityName,
      communityId: communityId,
    });
  };

  const getPostTypes = async () => {
    fetch(BASE_URL + 'post-types?communityId=' + PAGE_VARIABLES.communityId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Platform': 'ANDROID',
        Authorization: await getToken(),
      },
    })
      .then(async response => {
        const status = response.status;
        response = await response.json();
        if (status === 200) {
          setPostTypeList(response);
        } else {
          ToastAndroid.show(response.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.info(error);
        ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
        setPostTypeList(mockPostTypeList);
      });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        titleComponent={<Text style={headerTextStyle}>Choose Post Type</Text>}
        navigate={navigation.goBack}
        iconName="arrow-left-circle"
      />
      <FlatList
        refreshing={refreshing}
        onRefresh={_onRefresh}
        data={postTypeList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigateCreatePost(item);
            }}>
            <View style={list}>
              <Image source={postTypeIcon} style={styles.image} />
              <Text style={listItem}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const mockPostTypeList = [
  {
    name: 'Discussion',
    id: 1,
  },
  {
    name: 'Tournament',
    id: 2,
  },
  {
    name: 'Question',
    id: 3,
  },
  {
    name: 'Story',
    id: 4,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 20,
    height: 20,
  },
});
