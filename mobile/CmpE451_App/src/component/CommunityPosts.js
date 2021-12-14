import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {TEXT, PAGE_VARIABLES} from '../constants';
import * as Request from '../util/Requests';
import PostDetail from './PostDetail';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MessageList from '../component/MessageList';
import {COLORS} from '../theme/colors';
import MapView, {Marker} from 'react-native-maps';

export default function CommunityPosts({}) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const _posts = await Request.getCommunityPosts(
        PAGE_VARIABLES.communityId,
      );
      setPosts(_posts);
    }
    getPosts();
  }, []);

  function PostDetail({
    user,
    date,
    community,
    textFieldNames,
    numberFieldNames,
    dateFieldNames,
    linkFieldNames,
    locationFieldNames,
    isLiked,
    likeCount,
  }) {
    return (
      <TouchableOpacity onPress={() => {}} style={styles.container}>
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
              <Text style={styles.timestamp}>{moment(date).fromNow()}</Text>
              <Text> </Text>
              <Text> </Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginLeft: 6}}>
          <View style={{flexDirection: 'column'}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={textFieldNames}
              renderItem={({item}) => (
                <View style={{width: '90%'}}>
                  <Text style={styles.fieldName}>{item.name}</Text>
                  <Text style={styles.content}>{item.value}</Text>
                  <Text></Text>
                </View>
              )}
            />
          </View>
          <View style={{flexDirection: 'column'}}>
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
          <View style={{flexDirection: 'column'}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={dateFieldNames}
              renderItem={({item}) => (
                <View>
                  <Text style={styles.fieldName}>{item.name}</Text>
                  <Text style={styles.content}>
                    {moment(item.value).format('MMMM Do YYYY, h:mm:ss a')}
                  </Text>
                  <Text></Text>
                </View>
              )}
            />
          </View>
          <View style={{flexDirection: 'column'}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={linkFieldNames}
              renderItem={({item}) => (
                <View style={{width: '90%'}}>
                  <Text style={styles.fieldName}>{item.name}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL(item.value)}>
                    <Text style={{color: COLORS.buttonColor}}>
                      {item.value}
                    </Text>
                  </TouchableOpacity>
                  <Text></Text>
                </View>
              )}
            />
          </View>
          <View style={{flexDirection: 'column'}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={locationFieldNames}
              renderItem={({item, index}) => (
                <View>
                  <View>
                    <Text style={styles.fieldName}>
                      {locationFieldNames[index].name}
                    </Text>
                    <Text style={styles.content}>
                      {locationFieldNames[index].value.description}
                    </Text>
                  </View>
                  <View>
                    <MapView
                      style={styles.map}
                      initialRegion={{
                        latitude:
                          locationFieldNames[index]['value']['geo']['latitude'],
                        longitude:
                          locationFieldNames[index]['value']['geo'][
                            'longitude'
                          ],
                        latitudeDelta: 0.004757,
                        longitudeDelta: 0.006866,
                      }}></MapView>
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
        </View>
        <View style={{flexDirection: 'row', top: 18}}>
          <Icon
            name="heart"
            size={24}
            color={isLiked ? COLORS.buttonColor : COLORS.unlikeButtonColor}
            style={{marginRight: 8}}
          />
          <Text> {likeCount} likes </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={({item, index}) =>
        PostDetail({
          user: item.user,
          date: item.date,
          community: item.community,
          textFieldNames: item.textFieldNames,
          numberFieldNames: item.numberFieldNames,
          dateFieldNames: item.dateFieldNames,
          linkFieldNames: item.linkFieldNames,
          locationFieldNames: item.locationFieldNames,
          isLiked: item.isLiked,
          likeCount: item.likeCount,
        })
      }
      keyExtractor={(item, index) => item.id}
      showsVerticalScrollIndicator={false}></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },
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
    flexWrap: 'wrap',
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
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
    padding: 4,
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: '#838899',
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    width: wp('90%'),
    height: wp('60%'),
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 7,
    elevation: 5,
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: hp('2%'),
  },
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: '#838899',
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
