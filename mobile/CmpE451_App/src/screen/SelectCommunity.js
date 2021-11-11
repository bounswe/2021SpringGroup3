import React, {useState, useEffect} from 'react';
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../theme/colors';
import {PAGE_VARIABLES} from '../constants';
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

  const navigateSelectDataType = selectedCommunityId => {
    PAGE_VARIABLES.communityId = selectedCommunityId;
    navigation.navigate('SelectDataType');
  };

  const getCommunities = () => {
    AXIOS_CLIENT.get('communities')
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          setCommunityList(responseData.data);
        }
      })
      .catch(error => {
        console.error(error);
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
              navigateSelectDataType(item.id);
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
