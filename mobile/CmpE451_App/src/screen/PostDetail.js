import {View, Text, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme/colors';
import {TEXT, PAGE_VARIABLES} from '../constants';
import {AXIOS_CLIENT} from '../services/axiosCientService';
import * as Requests from '../services/BoxyClient';
import {IconButton} from 'react-native-paper';
import Geocoder from 'react-native-geocoding';
import MapView, {Marker} from 'react-native-maps';
import Moment from 'moment';


import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';

export default function PostDetail({route, navigation}) {

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
  const [postDetail, setPostDetail] = useState([]);

  const [locationName, setLocationName] = useState([]);
  const [locationDescription, setLocationDescription] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);

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
      setPostDetail(postDetailResponse);
    }
    init();
  }, []);

  return (
    <View style={styles.feedItem}>
      <View>
        <Image source={{uri: user.imageUrl}} style={styles.avatar} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={{fontSize: 18, color: COLORS.textColor}}>
              {user.username}
            </Text>
            <Text style={{fontSize: 12, color: COLORS.textColor}}>
              {community.name}
            </Text>
            <Text style={styles.timestamp}>
              {moment(date).fromNow()}
            </Text>
            <Text> </Text>
            <Text> </Text>
          </View>
        </View>
      </View>

          <View>
          <FlatList
              showsHorizontalScrollIndicator={false}
              data={textFieldNames}
              renderItem={({item}) => (
                <View>
                  <Text style={styles.fieldName}>{item.name}</Text>
                  <Text style={styles.content}>{item.value}</Text>
                  <Text></Text>
                </View>
              )}
            />
          </View>
          <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={numberFieldNames}
            renderItem={({item}) => (
              <View>
                <Text style={styles.fieldName}>{item.name}</Text>
                <Text style={styles.content}>{item.value}</Text>
                <Text></Text>
              </View>
            )}
          />
          </View>
          <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={dateFieldNames}
            renderItem={({item}) => (
              <View>
                <Text style={styles.fieldName}>{item.name}</Text>
                <Text style={styles.content}>{moment(item.value).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                <Text></Text>
              </View>
            )}
          />
          </View>
          <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={linkFieldNames}
            renderItem={({item}) => (
              <View>
                <Text style={styles.fieldName}>{item.name}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(item.value)}>
                  <Text style={{color: COLORS.buttonColor}}>{item.value}</Text>
                </TouchableOpacity>
                <Text></Text>
              </View>
            )}
          />
          </View>

          <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={locationFieldNames}
            renderItem={({item,index}) => (
              <View>
                <View>
                  <Text style={styles.fieldName}>{locationFieldNames[index].name}</Text>
                  <Text style={styles.content}>{locationFieldNames[index].value.description}</Text>
                </View>
                <View>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: locationFieldNames[index]['value']['geo']['latitude'],
                        longitude: locationFieldNames[index]['value']['geo']['longitude'],
                        latitudeDelta: 0.004757,
                        longitudeDelta: 0.006866,
                      }}
                    >
                  </MapView>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                </View>
              </View>
            )}
          />

      </View>

        <View style={{flexDirection: 'row', top:18}}>
          <Icon
            name="heart"
            size={24}
            color={
              isLiked
                ? COLORS.buttonColor
                : COLORS.unlikeButtonColor
            }
            style={{marginRight: 8}}
          />
          <Text> {likeCount} likes </Text>
        </View>
    </View>
    
  );
}


const styles = StyleSheet.create({
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 20,
    flexDirection: 'column',
    marginVertical: 8,
    minHeight: '100%',
    removeClippedSubviews: true,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  fieldName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
  map: {
  position: 'absolute',
  top: 10,
  left: 0,
  right: 0,
  bottom: 0,
  width: 250,

},
marker: {
  height: 48,
  width: 48,
},
region: {
  color: '#fff',
  lineHeight: 20,
  margin: 20,
},
});
