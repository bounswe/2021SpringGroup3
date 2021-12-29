import React, {useState, useEffect} from 'react';
import {View, FlatList, ToastAndroid, Text} from 'react-native';
import {COLORS} from '../theme/colors';
import SearchBar from '../component/SearchBar';
import SearchResultComponent from '../component/SearchResult';
import CommonIcon from '../component/CommonIcon';
import DropDownPicker from 'react-native-dropdown-picker';
import {IconButton} from 'react-native-paper';
import * as client from '../services/BoxyClient';
import {PAGE_VARIABLES} from '../constants';

export default function Search({navigation}) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [resultsTitle, setResultsTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [isCommunitySearch, setValue] = useState(true);
  const [items, setItems] = useState([
    {
      label: 'Community',
      value: true,
      icon: () => (
        <IconButton
          icon="account-multiple"
          size={22}
          color={COLORS.buttonColor}
          style={{marginHorizontal: 0}}
        />
      ),
    },
    {
      label: 'User',
      value: false,
      icon: () => (
        <IconButton
          icon="account"
          size={22}
          color={COLORS.buttonColor}
          style={{marginHorizontal: 0}}
        />
      ),
    },
  ]);

  useEffect(() => {
    handleTextChange(searchText);
  }, [isCommunitySearch]);

  useEffect(() => {
    handleTextChange(searchText);
  }, []);

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
    if (isCommunitySearch) {
      setResultsTitle('Recommended Communities');
      let response = await client.getRecommendedCommunities();
      const status = response.status;
      if (status == 200) {
        setSearchResults(response.data);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } else {
      setResultsTitle('Recommended Users');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CommonIcon
          icon={'keyboard-backspace'}
          IconColor={'white'}
          onPress={navigation.goBack}
        />
        <SearchBar isSearchEnabled={true} onSearch={handleTextChange} />
      </View>
      <View style={{width: '95%', alignItems: 'center', marginVertical: 5}}>
        <DropDownPicker
          open={open}
          value={isCommunitySearch}
          items={items}
          maxHeight={80}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          stickyHeader={true}
          style={{
            height: 40,
          }}
        />
      </View>
      <View style={{padding: 5, width:'100%'}}>
        <Text> {resultsTitle} </Text>
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
};
