import React, {useState, useEffect} from 'react';
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  View,
} from 'react-native';
import {COLORS} from '../theme/colors';
import {TEXT, PAGE_VARIABLES, BASE_URL} from '../constants';
import {getToken} from '../services/asyncStorageService';
import {headerTextStyle} from '../theme/styles';
import ScreenHeader from '../component/ScreenHeader';

export default function SelectModeratorCommunity({navigation}) {
  const [communityList, setCommunityList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getModeratorCommunities();
  }, []);

  const _onRefresh = () => {
    setRefreshing(true);
    getModeratorCommunities();
    setRefreshing(false);
  };

  const navigateCreatePostType = selectedCommunityId => {
    PAGE_VARIABLES.communityId = selectedCommunityId;
    navigation.navigate('CreatePostType');
  };

  const getModeratorCommunities = async () => {
    fetch(BASE_URL + 'communities?isModerator=' + true, {
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
          setCommunityList(response);
        } else {
          ToastAndroid.show(response.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.info(error);
        ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
      });
  };

  const navigate = async () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        titleComponent={<Text style={headerTextStyle}>Choose Community</Text>}
        navigate={navigate}
      />
      <FlatList
        refreshing={refreshing}
        onRefresh={_onRefresh}
        data={communityList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigateCreatePostType(item.id);
            }}>
            <View style={styles.list}>
              <Image source={{uri: item.iconUrl}} style={styles.image} />
              <Text style={styles.item}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 30,
    height: 30,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
});
