import {View, Text, Linking, Modal} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {IconButton} from 'react-native-paper';
import {COLORS} from '../theme/colors';
import {useIsFocused} from '@react-navigation/native';
import * as client from '../services/BoxyClient';
import Comment from './Comment.js';
import MapView from 'react-native-maps';
import {WebView} from 'react-native-webview';
import {
  FlatList,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';

export default function PostDetail({
  id,
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
  comments,
  showComments = false,
  commentCount,
  tags,
}) {
  const [isLikedState, setIsLikedState] = useState();
  const [likeCounState, setLikeCountState] = useState();
  const [commentsState, setCommentsState] = useState(comments);
  const [commentCountState, setCommentCountState] = useState(commentCount);
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');
  const isFocused = useIsFocused();
  const [tagDetail, setTagDetail] = useState();
  useEffect(() => {
    async function init() {
      setIsLikedState(isLiked);
      setLikeCountState(likeCount);
      setCommentsState(comments);
      setCommentCountState(commentCount);
    }
    if (isFocused) {
      init();
    }
  }, [commentCount, comments, isFocused, isLiked, likeCount]);

  const handleLikePost = async () => {
    let response = await client.likePost({postId: id});
    const status = response.status;
    if (status === 200) {
      setLikeCountState(response.data.likeCount);
      setIsLikedState(response.data.isLiked);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  };

  const handleCommentPost = async () => {
    let response = await client.commentPost({postId: id, comment: comment});
    const status = response.status;
    if (status === 200) {
      setCommentsState(response.data.comments);
      setCommentCountState(response.data.comments.length);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  };

  async function prepareTagDetail(id) {
    const response = await client.getSuggesstedTags(tags[index].id);
    setTagDetail(response.data[0]);
    console.log('tag.detail: ', tagDetail);
  }

  function getTagDetail() {
    return (
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View
            style={{
              backgroundColor: '#ffffff',
              margin: 20,
              borderRadius: 10,
              flex: 1,
            }}>
            <WebView
              source={{
                uri: tagDetail.concepturi,
              }}
              style={{marginTop: 20}}
            />
          </View>
        </View>
      </Modal>
    );
  }

  return showModal ? (
    getTagDetail()
  ) : (
    <ScrollView>
      <View style={styles.feedItem}>
        <View>
          <Image source={{uri: user.profilePhotoUrl}} style={styles.avatar} />
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
                <Text />
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
                <Text />
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
                <Text style={styles.content}>
                  {moment(item.value).format('MMMM Do YYYY, h:mm:ss a')}
                </Text>
                <Text />
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
                <Text />
              </View>
            )}
          />
        </View>
        <View>
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
                      latitude: locationFieldNames[index].value.geo.latitude,
                      longitude: locationFieldNames[index].value.geo.longitude,
                      latitudeDelta: 0.004867,
                      longitudeDelta: 0.006976,
                    }}
                  />
                  <Text />
                  <Text />
                  <Text />
                  <Text />
                  <Text />
                  <Text />
                  <Text />
                </View>
              </View>
            )}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{direction: 'row'}}>
          <View style={{flexDirection: 'row', top: 10, marginRight: 15}}>
            <View>
              {isLikedState ? (
                <Icon
                  name="heart"
                  size={24}
                  color={'red'}
                  style={{marginRight: 4}}
                />
              ) : (
                <Icon
                  name="heart"
                  size={24}
                  color={COLORS.unlikeButtonColor}
                  style={{marginRight: 8}}
                  onPress={handleLikePost}
                />
              )}
            </View>
            <Text> {likeCounState} </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <View>
              <IconButton
                icon="comment"
                size={24}
                color={COLORS.unlikeButtonColor}
                style={{margin: 0}}
              />
            </View>
            <Text style={{marginTop: 5}}> {commentCountState} </Text>
          </View>
          {tags?.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                }}
                onPress={() => {
                  prepareTagDetail(item.id).then(res => {
                    setIndex(index);
                    setShowModal(true);
                  });
                }}>
                <View>
                  <IconButton
                    icon="tag"
                    size={24}
                    color={COLORS.unlikeButtonColor}
                    style={{margin: 0}}
                  />
                </View>
                <Text style={{marginTop: 5}}> {item.name} </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {showComments && (
        <View>
          <View style={styles.commentContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 5,
              }}>
              <TextInput
                multiline
                style={styles.commentText}
                onChangeText={text => setComment(text)}
                underlineColorAndroid="#f000"
                placeholder="Add a comment"
                placeholderTextColor="#8b9cb5"
                returnKeyType="next"
                blurOnSubmit={false}
              />
              <View>
                <IconButton
                  icon="send"
                  size={24}
                  color={COLORS.unlikeButtonColor}
                  style={{flex: 1, margin: 5}}
                  onPress={handleCommentPost}
                />
              </View>
            </View>
          </View>
          {commentCountState > 0 && (
            <Text style={{margin: 5}}> All Comments </Text>
          )}
          <FlatList
            style={styles.feed}
            data={commentsState}
            renderItem={({item}) => (
              <Comment
                id={item.id}
                user={item.user}
                date={item.date}
                content={item.text}
              />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{marginVertical: 70}} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 20,
    flexDirection: 'column',
    marginVertical: 5,
  },
  commentContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 5,
    flexDirection: 'column',
    marginVertical: 8,
  },
  commentText: {
    color: 'black',
    borderRadius: 8,
    paddingLeft: 6,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: COLORS.formInputAreaColor,
    flex: 5,
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
  },
  content: {
    fontSize: 16,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
    marginBottom: 10,
  },
  map: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    width: 180,
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
