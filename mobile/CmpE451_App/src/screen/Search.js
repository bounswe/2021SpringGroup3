import React, {useState, useEffect} from 'react';
import {View, FlatList, ToastAndroid} from 'react-native';
import {COLORS} from '../theme/colors';
import SearchBar from '../component/SearchBar';
import SearchResultComponent from '../component/SearchResult';
import CommonIcon from '../component/CommonIcon';
import DropDownPicker from 'react-native-dropdown-picker';
import {IconButton} from 'react-native-paper';
import * as client from '../services/BoxyClient';

export default function Search({navigation}) {
  const [searchResults, setSearchResults] = useState([]);
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

  const handleSearch = async query => {
    if (query.length > 0) {
      if (isCommunitySearch) {
        let response = await client.searchCommunity({query: query});
        const status = response.status;
        if (status == 200) {
          setSearchResults(response.data);
        } else {
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        }
      }
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
        <SearchBar isSearchEnabled={true} onSearch={handleSearch} />
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
              onPress={item.text}
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
              name={item.name}
              icon={item.iconUrl}
              description={item.description}
              isPrivate={item.isPrivate}
              onPress={item.text}
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
};
