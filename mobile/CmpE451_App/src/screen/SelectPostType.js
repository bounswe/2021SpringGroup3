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
import {IconButton} from 'react-native-paper';


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
      <IconButton
        icon="close"
        color="grey"
        size={20}
        onPress={() => navigation.navigate('Main')}
      />
      <Text style={styles.header}>Choose Post Type</Text>
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
              <Image
                source={{
                  uri: 'https://drive.google.com/uc?export=view&id=1y1OBVIC_xvt7bTGaQ-OUIdYSnSljbM0n',
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
    paddingTop: 2,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
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
