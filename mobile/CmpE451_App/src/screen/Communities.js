import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {PAGE_VARIABLES} from '../constants';
import TabScreen from '../component/TabScreen';
import ScreenHeader from '../component/ScreenHeader';
import * as client from '../services/BoxyClient';
import {IconButton} from 'react-native-paper';
import {COLORS} from '../theme/colors';
import {textInputArea} from '../theme/styles';
import {headerTextStyle} from '../theme/styles';

const Tab = createMaterialTopTabNavigator();

export default function Communities({navigation}) {
  const [memberCommunityList, setMemberCommunityList] = useState([]);
  const [moderatorCommunityList, setModeratorCommunityList] = useState([]);
  const [allCommunityList, setAllCommunityList] = useState([]);

  const [filteredMemberCommunityList, setFilteredMemberCommunityList] =
    useState([]);
  const [filteredModeratorCommunityList, setFilteredModeratorCommunityList] =
    useState([]);
  const [filteredAllCommunityList, setFilteredAllCommunityList] = useState([]);

  const [refreshingMemberCommunities, setRefreshingMemberCommunities] =
    useState(false);
  const [refreshingModeratorCommunities, setRefreshingModeratorCommunities] =
    useState(false);
  const [refreshingAllCommunities, setRefreshingAllCommunities] =
    useState(false);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    applyQuery(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allCommunityList,
    memberCommunityList,
    moderatorCommunityList,
    searchText,
  ]);

  useEffect(() => {
    async function init() {
      const _memberCommunityList = await client.getCommunities({
        isMember: true,
      });
      const _moderatorCommunityList = await client.getCommunities({
        isMember: false,
        isModerator: true,
      });
      const _allCommunityList = await client.getCommunities({
        isMember: false,
        isModerator: false,
      });

      setMemberCommunityList(_memberCommunityList);
      setModeratorCommunityList(_moderatorCommunityList);
      setAllCommunityList(_allCommunityList);

      setFilteredMemberCommunityList(_memberCommunityList);
      setFilteredModeratorCommunityList(_moderatorCommunityList);
      setFilteredAllCommunityList(_allCommunityList);
    }
    init();
  }, []);

  function applyQuery(query) {
    let tempArray = memberCommunityList.filter(function (item) {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredMemberCommunityList(tempArray);

    tempArray = moderatorCommunityList.filter(function (item) {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredModeratorCommunityList(tempArray);

    tempArray = allCommunityList.filter(function (item) {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredAllCommunityList(tempArray);
  }

  const _onRefreshMemberCommunities = async () => {
    setRefreshingMemberCommunities(true);
    const _memberCommunityList = await client.getCommunities({isMember: true});
    setMemberCommunityList(_memberCommunityList);
    setRefreshingMemberCommunities(false);
  };

  const _onRefreshModeratorCommunities = async () => {
    setRefreshingModeratorCommunities(true);
    const _moderatorCommunityList = await client.getCommunities({
      isMember: false,
      isModerator: true,
    });
    setModeratorCommunityList(_moderatorCommunityList);
    setRefreshingModeratorCommunities(false);
  };

  const _onRefreshAllCommunities = async () => {
    setRefreshingAllCommunities(true);
    const _allCommunityList = await client.getCommunities({
      isMember: false,
      isModerator: false,
    });
    console.log(_allCommunityList);

    setAllCommunityList(_allCommunityList);
    setRefreshingAllCommunities(false);
  };

  const navigateCommunityPage = selectedCommunity => {
    PAGE_VARIABLES.communityId = selectedCommunity.id;

    navigation.navigate('Community', {
      communityName: selectedCommunity.name,
      communityId: selectedCommunity.id,
    });
  };

  function memberCommunitesTab() {
    return (
      <TabScreen
        onRefresh={_onRefreshMemberCommunities}
        refreshing={refreshingMemberCommunities}
        communityList={filteredMemberCommunityList}
        onPress={navigateCommunityPage}
      />
    );
  }

  function moderatorCommunitesTab() {
    return (
      <TabScreen
        onRefresh={_onRefreshModeratorCommunities}
        refreshing={refreshingModeratorCommunities}
        communityList={filteredModeratorCommunityList}
        onPress={navigateCommunityPage}
      />
    );
  }

  function allCommunitesTab() {
    return (
      <TabScreen
        onRefresh={_onRefreshAllCommunities}
        refreshing={refreshingAllCommunities}
        communityList={filteredAllCommunityList}
        onPress={navigateCommunityPage}
      />
    );
  }

  const navigate = async () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        titleComponent={<Text style={headerTextStyle}>Communities</Text>}
        navigate={navigate}
      />
      <View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            paddingHorizontal: 7,
          }}>
          <IconButton icon="text-search" color={COLORS.buttonColor} size={20} />
          <TextInput
            style={styles.textInput}
            onChangeText={text => {
              setSearchText(text);
            }}
            placeholder="search"
          />
        </View>
      </View>
      <Tab.Navigator>
        <Tab.Screen
          key={'tab-1'}
          name={'Member'}
          component={memberCommunitesTab}
        />
        <Tab.Screen
          key={'tab-2'}
          name={'Moderator'}
          component={moderatorCommunitesTab}
        />
        <Tab.Screen key={'tab-3'} name={'All'} component={allCommunitesTab} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    textInputArea,
    width: '85%',
  },
});
