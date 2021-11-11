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
import {TEXT, PAGE_VARIABLES} from '../constants';
import {AXIOS_CLIENT} from '../services/axiosCientService';

export default function SelectPostType({navigation}) {
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
    PAGE_VARIABLES.postTypeId = selectedPostTypeId;
    navigation.navigate('CreatePost');
  };

  const getPostTypes = () => {
    AXIOS_CLIENT.get('post-types', {
      params: {communityId: PAGE_VARIABLES.communityId},
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          setPostTypeList(responseData.data);
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
      <Text style={styles.header}>Choose your Box</Text>
      <FlatList
        refreshing={refreshing}
        onRefresh={_onRefresh}
        data={postTypeList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigateCreatePost(item.id);
            }}>
            <View style={styles.list}>
              <Image
                source={{
                  uri: 'https://drive.google.com/uc?export=view&id=17UJQPtBS52HLa0GXmBWPqsSFjs9i8oM2',
                }}
                style={styles.image}
              />
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
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 60,
    color: COLORS.textColor,
    textAlignVertical: 'center',
  },
  header: {
    fontSize: 25,
    alignSelf: 'center',
    color: COLORS.textColor,
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
