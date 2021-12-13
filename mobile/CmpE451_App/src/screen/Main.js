import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {PAGE_VARIABLES} from '../constants';
import TabScreen from '../component/TabScreen';
import CloseButton from '../component/CloseButton';
import * as client from '../services/BoxyClient';
import {headerStyle} from '../theme/styles';
import {headerContainerStyle} from '../theme/styles';
import {IconButton} from 'react-native-paper';
import {COLORS} from '../theme/colors';
import PostDetailComponent from '../component/PostDetail';
import ScreenHeader from '../component/ScreenHeader';
import {headerTextStyle} from '../theme/styles';

export default function Main({navigation}) {
    const [memberCommunityList, setMemberCommunityList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [refreshingCommunities, setRefreshingCommunities] = useState(false);
    const [refreshingPosts, setRefreshingPosts] = useState(false);
    const [postList2, setPostList2] = useState([]);

    useEffect(() => {
        async function init() {
        const _memberCommunityList = await client.getCommunities({
            isMember: true,
        });
        setMemberCommunityList(_memberCommunityList);
        const tempPostList = []
        for(let i = 0; i<_memberCommunityList.length; i++){
            const communityPostList = await client.getPosts({communityId: _memberCommunityList[i].id});
            for(let j=0; j<communityPostList.length; j++){
              tempPostList.push(communityPostList[j])
            }
        };
        setPostList(tempPostList);
      }
        init();
    }, []);

    const _onRefreshPosts = async () => {
      const _memberCommunityList = await client.getCommunities({
            isMember: true,
        });
        setMemberCommunityList(_memberCommunityList);
        const tempPostList = []
        for(let i = 0; i<_memberCommunityList.length; i++){
            const communityPostList = await client.getPosts({communityId: _memberCommunityList[i].id});
            for(let j=0; j<communityPostList.length; j++){
              tempPostList.push(communityPostList[j])
            }
        };
        setPostList(tempPostList);
    };

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      _onRefreshPosts();
      wait(2000).then(() => setRefreshing(false));
    }, []);

    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }

    function navigateToPost(postId, communityId){
      PAGE_VARIABLES.postId = postId;
      PAGE_VARIABLES.communityId = communityId;
      navigation.navigate('PostDetail');
    }

    return (
        <View style={styles.container}>
          <View style={headerContainerStyle}>
            <View style={{flex: 1}}>
            </View>
            <Text style={headerTextStyle}>Home</Text>
            <View style={{flex: 1}} />
          </View>
          <FlatList
              refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />}
              style={styles.feed}
              data={postList}
              renderItem={({item}) => 
                <TouchableOpacity
                  onPress={() => navigateToPost(item.id, item.community.id)}>
                  <PostDetailComponent user={item.user} date={item.date} community={item.community} textFieldNames={item.textFieldNames} 
                    numberFieldNames={item.numberFieldNames} dateFieldNames={item.dateFieldNames} linkFieldNames={item.linkFieldNames} locationFieldNames={item.locationFieldNames}
                    isLiked={item.isLiked} likeCount={item.likeCount}/>
                </TouchableOpacity> 
              }
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}>
                
                
          </FlatList>
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