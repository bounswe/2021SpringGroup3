import React, {useState, useEffect, Fragment} from 'react';
import {View, FlatList, ToastAndroid, Text, Image} from 'react-native';
import {COLORS} from '../theme/colors';
import SearchBar from '../component/SearchBar';
import SearchResultComponent from '../component/SearchResult';
import CommonIcon from '../component/CommonIcon';
import DropDownPicker from 'react-native-dropdown-picker';
import {postTypeIcon} from '../image/index';
import * as client from '../services/BoxyClient';
import {PAGE_VARIABLES} from '../constants';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {useIsFocused} from '@react-navigation/native';

export default function CommunitySearch({navigation}) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [resultsTitle, setResultsTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [isCommunitySearch, setValue] = useState(true);
  const [selectedItem, setSelectedItem] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    handleTextChange(searchText);
  }, [isCommunitySearch]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getPostTypes();
    }
  }, [isFocused]);

  const getPostTypes = async () => {
    let response = await client.getPostTypes({
      communityId: PAGE_VARIABLES.communityId,
    });
    const status = response.status;
    if (status == 200) {
      setItems(response.data);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  };
  const navigateCommunityPage = (id, name) => {
    PAGE_VARIABLES.communityId = id;

    navigation.navigate('Community', {
      communityName: name,
      communityId: id,
    });
  };

  const navigateProfilePage = (id, name) => {
    navigation.navigate('OtherUserProfile', {id: id});
  };

  const handleTextChange = async query => {
    setSearchText(query);
    if (query.length > 0) {
      handleSearch(query);
    } else {
      handleRecommendation();
    }
  };

  const handleSearch = async query => {
    setResultsTitle('Results');
    if (isCommunitySearch) {
      let response = await client.searchCommunity({query: query});
      const status = response.status;
      if (status == 200) {
        setSearchResults(response.data);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } else {
      let response = await client.searchUser({query: query});
      const status = response.status;
      if (status == 200) {
        setSearchResults(response.data);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    }
  };

  const handleRecommendation = async () => {
    let response;
    if (isCommunitySearch) {
      setResultsTitle('Recommended Communities');
      response = await client.getRecommendedCommunities();
    } else {
      setResultsTitle('Recommended Users');
      response = await client.getRecommendedUsers();
    }
    const status = response.status;
    if (status == 200) {
      setSearchResults(response.data);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 5, width: '100%'}}>
        <CommonIcon
          icon={'keyboard-backspace'}
          IconColor={'white'}
          onPress={navigation.goBack}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <View style={{flex: 1}}>
          <Image source={postTypeIcon} style={styles.image} />
        </View>
        <View style={{flex: 6}}>
          <Text> Choose Post Type </Text>
        </View>
      </View>

      <SearchableDropdown
        selectedItems={selectedItem}
        onItemSelect={item => {
          setSelectedItem(item);
        }}
        containerStyle={{padding: 5, width: '100%'}}
        onRemoveItem={(item, index) => {
          this.setState({});
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#ddd',
          borderColor: '#bbb',
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{color: '#222'}}
        itemsContainerStyle={{maxHeight: 140}}
        items={items}
        defaultIndex={2}
        resetValue={false}
        textInputProps={{
          placeholder: 'Post Types',
          style: {
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
          },
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
      <View style={{width: '95%', alignItems: 'center', marginVertical: 5}} />
      <View style={{padding: 5, width: '100%'}}>
        <Text> Posts </Text>
      </View>
      {isCommunitySearch ? (
        <FlatList
          style={styles.feedItem}
          data={searchResults}
          renderItem={({item}) => (
            <SearchResultComponent
              id={item.id}
              name={item.name}
              icon={item.iconUrl}
              description={item.description}
              isPrivate={item.isPrivate}
              onPress={navigateCommunityPage}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <FlatList
          style={styles.feedItem}
          data={searchResults}
          renderItem={({item}) => (
            <SearchResultComponent
              id={item.id}
              name={item.username}
              icon={item.imageUrl}
              onPress={navigateProfilePage}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const styles = {
  container: {flex: 1, alignItems: 'center'},
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
    width: 30,
    height: 30,
    marginLeft: 15,
  },
};
