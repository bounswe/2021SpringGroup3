import {View, Text, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TEXT, PAGE_VARIABLES} from '../constants';
import {AXIOS_CLIENT} from '../services/axiosCientService';
import * as Requests from '../services/BoxyClient';
import PostDetailComponent from '../component/PostDetail';
import ScreenHeader from '../component/ScreenHeader';
import {headerTextStyle} from '../theme/styles';

export default function PostDetail({route, navigation}) {

  const [id, setId] = useState([]);
  const [user, setUser] = useState([]);
  const [community, setCommunity] = useState([]);
  const [date, setDate] = useState([]);
  const [dateFieldNames, setDateFieldNames] = useState([]);
  const [linkFieldNames, setLinkFieldNames] = useState([]);
  const [textFieldNames, setTextFieldNames] = useState([]);
  const [numberFieldNames, setNumberFieldNames] = useState([]);
  const [locationFieldNames, setLocationFieldNames] = useState([]);
  const [isLiked, setIsLiked] = useState([]);
  const [likeCount, setLikeCount] = useState([]);

  const [markerState, setMarker] = useState({
    target: 347,
    coordinate: {
      latitude: 37.76135920121826,
      longitude: -122.4682573019337,
    },
    position: {
      x: 150,
      y: 269,
    },
  });
  const [regionState, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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
      setCommunity(community)
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

  return(
    <View>
      <ScreenHeader
          titleComponent={<Text style={headerTextStyle}></Text>}
          navigate={navigate}
        />
      <PostDetailComponent id = {id} user={user} date={date} community={community} textFieldNames={textFieldNames} numberFieldNames={numberFieldNames}
        dateFieldNames={dateFieldNames} linkFieldNames={linkFieldNames} locationFieldNames={locationFieldNames}
        isLiked={isLiked} likeCount={likeCount}/>
    </View>
  )};