import {View, Text, Linking, Alert} from 'react-native';
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
import * as Client from '../services/BoxyClient';
import Main from '../screen/Main.js';

import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';

export default function PostDetail({id, user, date, community, textFieldNames, numberFieldNames,
    dateFieldNames, linkFieldNames, locationFieldNames,
    isLiked, likeCount}) {

    const pressedLike = async () => {
      Client.likePost({
        communityId: community.id,
        postId: id,
      });
    }

    const deletePost = async () => {
      Client.deletePost({
        postId: id,
      });
      navigation.navigate(Main);
    }

    const pressedDelete = () => {
      Alert.alert(
        'Warning',
        'Are you sure you want to delete the post?',
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Yes',
            onPress: () => deletePost(),
          },
        ],
        {
          cancelable: true,
        },
      );
    };

    return (
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

        <View style={{flexDirection: 'row', top:5}}>
          <TouchableOpacity
              onPress={()=>{pressedLike()}}>
                <View>
                    <Icon
                      name="heart"
                      size={24}
                      color={
                        likeCount===0
                          ? COLORS.unlikeButtonColor
                          : "red"
                      }
                      style={{marginRight: 8}}
                    />
                </View>
            </TouchableOpacity>
          
          <Text> {likeCount} likes </Text>
        </View>
        <IconButton
            icon="delete"
            size={30}
            color="red"
            style={{alignSelf: 'flex-end', top:-30}}
            onPress={()=>pressedDelete()}
          />
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