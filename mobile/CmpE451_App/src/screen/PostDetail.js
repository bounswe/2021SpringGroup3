import {View, Text, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TEXT, PAGE_VARIABLES} from '../constants';
import {AXIOS_CLIENT} from '../services/axiosCientService';
import * as Requests from '../services/BoxyClient';
import PostDetailComponent from '../component/PostDetail';
import ScreenHeader from '../component/ScreenHeader';
import {headerTextStyle} from '../theme/styles';

export default function PostDetail({route, navigation}) {
  const [idState, setId] = useState([]);
  const [userState, setUser] = useState([]);
  const [communityState, setCommunity] = useState([]);
  const [dateState, setDate] = useState([]);
  const [dateFieldNamesState, setDateFieldNames] = useState([]);
  const [linkFieldNamesState, setLinkFieldNames] = useState([]);
  const [textFieldNamesState, setTextFieldNames] = useState([]);
  const [numberFieldNamesState, setNumberFieldNames] = useState([]);
  const [locationFieldNamesState, setLocationFieldNames] = useState([]);
  const [isLikedState, setIsLiked] = useState([]);
  const [likeCountState, setLikeCount] = useState([]);

  useEffect(() => {
    async function init() {
      const postDetailResponse = await Requests.getPostDetail({
        communityId: PAGE_VARIABLES.communityId,
        postId: PAGE_VARIABLES.postId,
      });
      const {
        id,
        user,
        community,
        date,
        textFieldNames,
        numberFieldNames,
        dateFieldNames,
        linkFieldNames,
        locationFieldNames,
        isLiked,
        likeCount,
      } = JSON.parse(postDetailResponse);
      setId(id);
      setUser(user);
      setDate(date);
      setCommunity(community);
      setTextFieldNames(textFieldNames);
      setNumberFieldNames(numberFieldNames);
      setDateFieldNames(dateFieldNames);
      setLinkFieldNames(linkFieldNames);
      setLocationFieldNames(locationFieldNames);
      setIsLiked(isLiked);
      setLikeCount(likeCount);
    }
    init();
  }, []);

  const navigate = async () => {
    navigation.navigate('Main');
  };

  return (
    <View>
      <ScreenHeader
        titleComponent={<Text style={headerTextStyle}></Text>}
        navigate={navigate}
        iconName="arrow-left-circle"
      />
      <PostDetailComponent
        id={idState}
        user={userState}
        date={dateState}
        community={communityState}
        textFieldNames={textFieldNamesState}
        numberFieldNames={numberFieldNamesState}
        dateFieldNames={dateFieldNamesState}
        linkFieldNames={linkFieldNamesState}
        locationFieldNames={locationFieldNamesState}
        isLiked={isLikedState}
        likeCount={likeCountState}
      />
    </View>
  );
}
