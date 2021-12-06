import {View, Text, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme/colors';
import {TEXT, PAGE_VARIABLES} from '../constants';
import {AXIOS_CLIENT} from '../services/axiosCientService';
import * as Requests from '../util/Requests';
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
      } = JSON.parse(postDetailResponse);
      
      setUser(user);
      setDate(date);
      setCommunity(community)
      setTextFieldNames(textFieldNames);
      setNumberFieldNames(numberFieldNames);
      setDateFieldNames(dateFieldNames);
      setLocationFieldNames(locationFieldNames);
      setLinkFieldNames(linkFieldNames);
      setIsLiked(isLiked);
    }
    init();
  }, []);
  

  return (
    <View style={styles.feedItem}>
        <Image source={{uri: user.imageUrl}} style={styles.avatar} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            
          }}>
          <View>
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
            </View>
            <Text style={styles.timestamp}>
              {moment(date).fromNow()}
            </Text>
            <Text> </Text>
            <Text> </Text>
          </View>
        </View>

        <View>
          <FlatList
            data={textFieldNames}
            renderItem={({item}) => (
              <View>
                <Text style={styles.fieldName}>{item.name}</Text>
                <Text style={styles.content}>{item.value}</Text>
                <Text></Text>
              </View>
            )}
          />

          <FlatList
            data={numberFieldNames}
            renderItem={({item}) => (
              <View>
                <Text style={styles.fieldName}>{item.name}</Text>
                <Text style={styles.content}>{item.value}</Text>
                <Text></Text>
              </View>
            )}
          />

          <FlatList
            data={dateFieldNames}
            renderItem={({item}) => (
              <View>
                <Text style={styles.fieldName}>{item.name}</Text>
                <Text style={styles.content}>{item.value}</Text>
                <Text></Text>
              </View>
            )}
          />

          <FlatList
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

          <FlatList
            data={locationFieldNames}
            renderItem={({item}) => (
              <View>
                <Text style={styles.fieldName}>{item.name}</Text>
                <Text style={styles.content}>{item.value}</Text>
              </View>
            )}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Icon
            name="heart"
            size={24}
            color={
              isLiked
                ? COLORS.buttonColor
                : COLORS.unlikeButtonColor
            }
            style={{marginRight: 16}}
          />
        </View>
    </View>
    
  );
}


const styles = StyleSheet.create({
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 18,
    flexDirection: 'column',
    marginVertical: 8,
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
    color: '#454D65',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
});
