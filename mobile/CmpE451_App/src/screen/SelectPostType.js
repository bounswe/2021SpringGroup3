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
import {COLORS} from '../theme/colors';
import {TEXT, PAGE_VARIABLES, BASE_URL} from '../constants';
import {getToken} from '../services/asyncStorageService';
import {postTypeIcon} from '../image/index';
import {headerStyle} from '../theme/styles';
import {headerContainerStyle} from '../theme/styles';
import CloseButton from '../component/CloseButton';

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
      <View style={headerContainerStyle}>
        <View style={headerStyle}>
          <Text style={{color: 'white', fontSize: 20}}>Choose Post Type</Text>
        </View>
        <CloseButton onPress={navigation.goBack} />
      </View>
      <FlatList
        refreshing={refreshing}
        onRefresh={_onRefresh}
        data={postTypeList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigateCreatePost(item);
            }}>
            <View style={styles.list}>
              <Image source={postTypeIcon} style={styles.image} />
              <Text style={styles.item}>{item.name}</Text>
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
  fieldHeader: {
    fontSize: 25,
    alignSelf: 'center',
    color: COLORS.textColor,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 60,
    color: COLORS.textColor,
    textAlignVertical: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.screenHeaderBackground,
    height: 50,
  },
  image: {
    width: 20,
    height: 20,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
});
