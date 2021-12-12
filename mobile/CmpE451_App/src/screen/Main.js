import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, FlatList, TouchableHighlight} from 'react-native';
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


export default function Main({navigation}) {
    const [memberCommunityList, setMemberCommunityList] = useState([]);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        async function init() {
        const _memberCommunityList = await client.getCommunities({
            isMember: true,
        });
        setMemberCommunityList(_memberCommunityList);

        const tempPostList = []
        for(let i = 0; i<memberCommunityList.length; i++){
            const communityPostList = await client.getPosts({communityId: memberCommunityList[i].id});
            for(let j=0; j<communityPostList.length; j++){
              tempPostList.push(communityPostList[j])
            }
        };
        setPostList(tempPostList);
        }
        init();
    }, []);

    function navigateToPost(postId, communityId){
      PAGE_VARIABLES.postId = postId;
      PAGE_VARIABLES.communityId = communityId;
      navigation.navigate('PostDetail');
    }

    return (
        <View style={styles.container}>
          <FlatList
              style={styles.feed}
              data={postList}
              renderItem={({item}) => 
                <TouchableHighlight
                  onPress={() => navigateToPost(item.id, item.community.id)}>
                  <PostDetailComponent user={item.user} date={item.date} community={item.community} textFieldNames={item.textFieldNames} 
                    numberFieldNames={item.numberFieldNames} dateFieldNames={item.dateFieldNames} linkFieldNames={item.linkFieldNames} locationFieldNames={item.locationFieldNames}
                    isLiked={item.isLiked} likeCount={item.likeCount}/>
                </TouchableHighlight> 
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