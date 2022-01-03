import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {PAGE_VARIABLES} from '../constants';
import * as Requests from '../services/BoxyClient';
import PostDetailComponent from '../component/PostDetail';
import ScreenHeader from '../component/ScreenHeader';
import {headerTextStyle} from '../theme/styles';
import {useIsFocused} from '@react-navigation/native';
import * as request from '../util/Requests';

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
  const [commentsState, setCommentsState] = useState([]);
  const [commentCountState, setCommentCount] = useState(0);
  const [postTypeState, setpostTypeState] = useState();
  const isFocused = useIsFocused();
  const [tags, setTags] = useState();
  const [isViewerPoster, setIsViewerPoster] = useState(false);

  const {isModerator} = route.params;

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
        comments,
        commentCount,
        tags,
        postType,
      } = JSON.parse(postDetailResponse);
      const profile = await request.getMyProfile();

      setTags(tags);
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
      setCommentsState(comments);
      setCommentCount(commentCount);
      setpostTypeState(postType);

      if((profile.username===user.username) || isModerator){
        setIsViewerPoster(true);
      }
      else{
        setIsViewerPoster(false);
      }

    }
    if (isFocused) {
      init();
    }
  }, [isFocused]);

  const navigate = async () => {
    navigation.navigate('Main');
  };

  return (
    <View>
      <ScreenHeader
        titleComponent={<Text style={headerTextStyle} />}
        navigate={navigate}
        iconName='home-circle-outline'
      />
      <PostDetailComponent
        Main={"Main"}
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
        comments={commentsState}
        commentCount={commentCountState}
        showComments={true}
        showDelete={isViewerPoster}
        tags={tags}
        postType={postTypeState}
      />
    </View>
  );
}
