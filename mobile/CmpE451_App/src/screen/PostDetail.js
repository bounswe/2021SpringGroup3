import {View, Text, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme/colors';
import {TEXT, PAGE_VARIABLES} from '../constants';
import {AXIOS_CLIENT} from '../services/axiosCientService';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';

export default function PostDetail({route, navigation}) {
  const postId = PAGE_VARIABLES.postId;
  const communityId = PAGE_VARIABLES.communityId;

  const [postDetail, setPostDetail] = useState({});

  useEffect(() => {
    getPostDetail();
  }, []);

  const getPostDetail = async () => {
    fetch(BASE_URL + 'post/detail?communityId=' + PAGE_VARIABLES.communityId + '&postId=' + PAGE_VARIABLES.postId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Platform': 'ANDROID',
        Authorization: await getToken(),
      },
    })
      .then(async response => {
        const status = response.status;
        response = await response.json();
        if (status === 200) {
          setPostDetail(response);
        } else {
          ToastAndroid.show(response.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.info(error);
        ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
        setPostDetail(mockpostDetail);
      });
  };

  return (
    <View style={styles.feedItem}>
      <ScrollView>
        <Image source={{uri: postDetail.userImageUrl}} style={styles.avatar} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
              <Text style={{fontSize: 18, color: COLORS.textColor}}>
                {postDetail.username}
              </Text>
              <Text style={{fontSize: 12, color: COLORS.textColor}}>
                {postDetail.communityName}
              </Text>
            </View>
            <Text style={styles.timestamp}>
              {moment(postDetail.date).fromNow()}
            </Text>
            <Text> </Text>
            <Text> </Text>
          </View>
        </View>

        <View>
          <Icon name="text" size={18} style={{marginRight: 16}} />
          <FlatList
            data={postDetail.textFieldNames}
            renderItem={({item}) => (
              <View>
                <Text style={styles.fieldName}>{item.name}</Text>
                <Text style={styles.content}>{item.value}</Text>
                <Text></Text>
              </View>
            )}
          />

          <FlatList
            data={postDetail.numberFieldNames}
            renderItem={({item}) => (
              <View>
                <Text style={styles.fieldName}>{item.name}</Text>
                <Text style={styles.content}>{item.value}</Text>
                <Text></Text>
              </View>
            )}
          />
          <Icon name="calendar" size={18} style={{marginRight: 16}} />
          <FlatList
            data={postDetail.dateFieldNames}
            renderItem={({item}) => (
              <View>
                <Text style={styles.fieldName}>{item.name}</Text>
                <Text style={styles.content}>{item.value}</Text>
                <Text></Text>
              </View>
            )}
          />

          <Icon name="link" size={18} style={{marginRight: 16}} />
          <FlatList
            data={postDetail.linkFieldNames}
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

          <Icon name="location" size={18} style={{marginRight: 16}} />
          <FlatList
            data={postDetail.locationFieldNames}
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
              postDetail.isLiked
                ? COLORS.buttonColor
                : COLORS.unlikeButtonColor
            }
            style={{marginRight: 16}}
          />
          <Text style={styles.content}>{postDetail.likeCount}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
const mockpostDetail = {
  id: '',
  username: 'zeynep',
  userImageUrl:
    'https://drive.google.com/uc?export=view&id=1gWuxzaJRQvaEmllvUXAlEf_ClgbD6YRD',
  communityName: 'chess',
  date: 1636156949000,
  textFieldNames: [
    {
      name: 'Tournament Name',
      value:
        'İstanbul Satranç Turnuvası \n*\n*\n*\n*\n*\nWe are excited to announce that we will have our first chess tournament on this Tuesday. You can see the details below. Do not forget to fill the registraion form!',
    },
  ],
  numberFieldNames: [
    {
      name: 'Max Capacity',
      value: 50,
    },
  ],
  dateFieldNames: [
    {
      name: 'Date',
      value: '16.11.2021',
    },
    {
      name: 'Hour',
      value: '18.00',
    },
  ],
  linkFieldNames: [
    {
      name: 'Link to registration form',
      value:
        'https://docs.google.com/forms/d/1snqCHFsaiRU1SkLfBImvuJICXH37OcwUMYta_zzDSzI/edit',
    },
  ],
  locationFieldNames: [
    {
      name: 'Location',
      value: 'Beşiktaş, İstanbul',
    },
  ],
  likeCount: 67,
  isLiked: true,
};

const styles = StyleSheet.create({
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 18,
    flexDirection: 'row',
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
