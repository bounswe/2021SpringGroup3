import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {BackHandler, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../component/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {size} from 'lodash';
import {bold} from 'chalk';
export default function CreatePost({route}) {
  const {selectedCommunityName} = route.params;
  const [index, setIndex] = useState(false);
  const [name, setName] = useState('');
  const [numberOfParticipants, setNumberOfParticipants] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');
  console.log(selectedCommunityName);
  const navigation = useNavigation();
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('Home', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener('Home', handleBackButtonClick);
      };
    }
  }, []);

  function myForum() {
    return (
      <View>
        <View
          style={{
            justifyContent: 'flex-end',
            margin: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            Tournament Name:
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              placeholder: 'Match Name',
              placeholderTextColor: 'gray',
              color: 'black',
              margin: 5,
              paddingBottom: 1,
            }}
            onChangeText={text => setName(text)}
            value={name}
            placeholder="......."
          />
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            margin: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            #Participants:
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              placeholder: 'Match Name',
              placeholderTextColor: 'gray',
              color: 'black',
              margin: 5,
              paddingBottom: 1,
            }}
            onChangeText={text => setNumberOfParticipants(text)}
            value={name}
            placeholder="......."
          />
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            margin: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            Date:
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              placeholder: 'Match Name',
              placeholderTextColor: 'gray',
              color: 'black',
              margin: 5,
              paddingBottom: 1,
            }}
            onChangeText={text => setDate(text)}
            value={name}
            placeholder="......."
          />
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            margin: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            Tournament Url:
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              placeholder: 'Match Name',
              placeholderTextColor: 'gray',
              color: 'black',
              margin: 5,
              paddingBottom: 1,
            }}
            onChangeText={text => setLink(text)}
            value={name}
            placeholder="......."
          />
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            margin: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            Location:
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              placeholder: 'Match Name',
              placeholderTextColor: 'gray',
              color: 'black',
              margin: 5,
              paddingBottom: 1,
            }}
            onChangeText={text => setLocation(text)}
            value={name}
            placeholder="......."
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={34} style={{marginLeft: 5}}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('@@@@@@@@@@@@@@@@@@@@')}>
          <View style={styles.nextButton}>
            <Text>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.postTitleArea}>
        <View
          style={{
            width: 200,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Icon name="cube-sharp" size={20} style={{margin: 5}} />
          <Text style={{color: 'black', margin: 5}}>
            {selectedCommunityName}
          </Text>
        </View>
        <Text>RULES</Text>
      </View>
      <View
        style={{
          minHeight: '50%',
          maxHeight: '50%',
          alignItems: 'flex-start',
        }}>
        {index ? (
          <View>
            <TextInput
              placeholder="Add a title"
              placeholderTextColor="black"
              style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 20}}
            />
          </View>
        ) : (
          myForum()
        )}
      </View>
      <View
        style={{
          marginTop: 20,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderTopColor: 'grey',
          borderTopWidth: 0.3,
          height: '40%',
          elevation: 6,
          backgroundColor: 'white',
          alignContent: 'center',
        }}>
        <View style={{alignContent: 'center'}}>
          <Text style={{alignSelf: 'center'}}>What Do You Want To Post?</Text>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-evenly',
              padding: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                padding: 5,
              }}>
              <View style={{}}>
                <TouchableOpacity onPress={() => setIndex(index + 1)}>
                  <Icon name="ios-text" style={{}} size={30}></Icon>
                  <Text style={{size: '3'}}>Text</Text>
                </TouchableOpacity>
              </View>
              <View style={{}}>
                <Icon name="image-outline" style={{}} size={30}></Icon>
                <Text style={{size: '3'}}>Audio</Text>
              </View>
              <View style={{}}>
                <Icon name="link" style={{}} size={30}></Icon>
                <Text style={{size: '3'}}>Link</Text>
              </View>
              <View style={{}}>
                <Icon name="videocam-outline" style={{}} size={30}></Icon>
                <Text style={{size: '3'}}>Video</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                padding: 5,
              }}>
              <View style={{}}>
                <Icon2 name="poll" style={{}} size={30}></Icon2>
                <Text style={{size: '3'}}>Poll</Text>
              </View>
              <View style={{}}>
                <TouchableOpacity onPress={() => setIndex(!index)}>
                  <Icon2 name="forum" style={{}} size={30}></Icon2>
                  <Text style={{size: '3'}}>Forum</Text>
                </TouchableOpacity>
              </View>
              <View style={{size: 3}}>
                <TouchableOpacity>
                  <Text style={{size: '3', color: 'white'}}>Forum</Text>
                </TouchableOpacity>
              </View>
              <View style={{size: 3}}>
                <TouchableOpacity>
                  <Text style={{size: '3', color: 'white'}}>Forum</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{alignContent: 'center', padding: 4}}>
              <View style={{alignItems: 'center'}}>
                <Text style={{}}>Not Allowed In This Community</Text>
                <Text>Pick another community to post this type of content</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  padding: 5,
                }}>
                <View style={{}}>
                  <Icon name="md-mic" style={{}} size={30}></Icon>
                  <Text style={{size: '3'}}>Audio</Text>
                </View>
                <View
                  style={{
                    minWidth: 1,
                    minHeight: 1,
                  }}></View>
                <View style={{}}></View>
                <View style={{}}></View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = {
  container: {flex: 1, height: '100%'},
  title: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextButton: {
    margin: 5,
    width: 70,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#C5C6C6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postTitleArea: {
    justifyContent: 'space-between',
    marginHorizontal: 10,
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
  },
};
