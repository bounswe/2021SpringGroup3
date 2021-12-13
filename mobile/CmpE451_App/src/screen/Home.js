import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, FlatList} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {PAGE_VARIABLES} from '../constants';
import TabScreen from '../component/TabScreen';
import CloseButton from '../component/CloseButton';
import * as client from '../services/BoxyClient';
import {headerStyle} from '../theme/styles';
import {headerContainerStyle} from '../theme/styles';
import {IconButton} from 'react-native-paper';
import {COLORS} from '../theme/colors';
import Post from '../component/Post';


export default function Communities({navigation}) {
    const [memberCommunityList, setMemberCommunityList] = useState([]);
    const [postList, setPostList]

    useEffect(() => {
        async function init() {
        const _memberCommunityList = await client.getCommunities({
            isMember: true,
        });
        setMemberCommunityList(_memberCommunityList);
        }
        init();
    }, []);

    const tempPostList = []
    for(let i = 0; i<memberCommunityList.length; i++){
        const _communityPostList = await client.getPosts({communityId: memberCommunityList[i].id});
        tempPostList = [...tempPostList, ..._communityPostList]
    };
    setPostDetail(tempPostList);

    return (
        <View style={styles.container}>
        <FlatList
            style={styles.feed}
            data={postList}
            renderItem={({item}) => <Post navigation={navigation} post={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}></FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBECF4',
  },
  feed: {
    marginHorizontal: 16,
  },
});