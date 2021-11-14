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
import {TEXT, PAGE_VARIABLES} from '../constants';
import {AXIOS_CLIENT} from '../services/axiosCientService';

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
      selectedCommunityName: selectedCommunityId.name,
    });
  };

  const getCommunities = () => {
    AXIOS_CLIENT.get('communities')
      .then(response => {
        if (response.status === 200) {
          setCommunityList(response.data);
        }
      })
      .catch(error => {
        console.info(error);
        ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
        setCommunityList(mockCommunityList);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Post to</Text>
      <FlatList
        refreshing={refreshing}
        onRefresh={_onRefresh}
        data={communityList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigateSelectPostType(item);
            }}>
            <View style={styles.list}>
              <Image source={{uri: item.icon}} style={styles.image} />
              <Text style={styles.item}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const mockCommunityList = [
  {
    name: 'Economics',
    id: 1,
    icon: 'https://reactnative.dev/docs/assets/p_cat1.png',
  },
  {
    name: 'Politics',
    id: 2,
    icon: 'https://reactnative.dev/docs/assets/p_cat2.png',
  },
  {
    name: 'CatLovers',
    id: 3,
    icon: 'https://reactnative.dev/docs/assets/p_cat1.png',
  },
  {
    name: 'CMPE451',
    id: 4,
    icon: 'https://reactnative.dev/docs/assets/p_cat2.png',
  },
  {
    name: 'PCMaster',
    id: 5,
    icon: 'https://reactnative.dev/docs/assets/p_cat1.png',
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
    width: 30,
    height: 30,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
});
