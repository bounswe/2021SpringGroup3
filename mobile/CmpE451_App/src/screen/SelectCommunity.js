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
import {TEXT, PAGE_VARIABLES, BASE_URL} from '../constants';
import {getToken} from '../services/asyncStorageService';
import {list} from '../theme/styles';
import {listItem} from '../theme/styles';
import {headerTextStyle} from '../theme/styles';
import ScreenHeader from '../component/ScreenHeader';

export default function SelectCommunity({navigation}) {
  const [communityList, setCommunityList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCommunities();
  }, []);

  const _onRefresh = () => {
    setRefreshing(true);
    getCommunities();
    setRefreshing(false);
  };

  const navigateSelectPostType = selectedCommunityId => {
    PAGE_VARIABLES.communityId = selectedCommunityId.id;
    navigation.navigate('SelectPostType', {
      communityName: selectedCommunityId.name,
      communityId: selectedCommunityId.id,
    });
  };

  const getCommunities = async () => {
    fetch(BASE_URL + 'communities?isMember=' + true, {
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

  return (
    <View style={styles.container}>
      <ScreenHeader
        titleComponent={<Text style={headerTextStyle}>Post to</Text>}
        navigate={navigation.goBack}
      />
      <FlatList
        refreshing={refreshing}
        onRefresh={_onRefresh}
        data={communityList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigateSelectPostType(item);
            }}>
            <View style={list}>
              <Image source={{uri: item.iconUrl}} style={styles.image} />
              <Text style={listItem}>{item.name}</Text>
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
  image: {
    width: 30,
    height: 30,
  },
});
