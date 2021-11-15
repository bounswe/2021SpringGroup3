import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <Text>Profile page is under construction</Text>
  </View>);
  /*
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons
              name="ios-arrow-back"
              size={24}
              color="#52575D"></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'center'}}>
          <View style={styles.profileImage}>
            <Image
              source={{
                uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
              }}
              style={styles.image}
              resizeMode="center"></Image>
          </View>
          <Text
            style={[
              styles.text,
              {color: '#AEB5BC', fontSize: 14, fontWeight: 'bold'},
            ]}>
            İstanbul
          </Text>
          <Text
            style={[
              styles.text,
              {color: '#AEB5BC', fontSize: 14, fontWeight: 'bold'},
            ]}>
            11/11/1111
          </Text>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{marginTop: 6, marginLeft: 2}}></Ionicons>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, {fontWeight: '200', fontSize: 36}]}>
            CmpE451
          </Text>
          <Text style={[styles.text, {color: '#AEB5BC', fontSize: 14}]}>
            Boxer
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, {fontSize: 24}]}>14</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1},
            ]}>
            <Text style={[styles.text, {fontSize: 24}]}>10</Text>
            <Text style={[styles.text, styles.subText]}>Communities</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, {fontSize: 24}]}>302</Text>
            <Text style={[styles.text, styles.subText]}>Following</Text>
          </View>
        </View>

        <View style={{marginTop: 32}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image
                source={{
                  uri: 'https://github.com/DesignIntoCode/ReactProfile02/blob/master/assets/media1.jpg',
                }}
                style={styles.image}
                resizeMode="cover"></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={{
                  uri: 'https://github.com/DesignIntoCode/ReactProfile02/blob/master/assets/media1.jpg',
                }}
                style={styles.image}
                resizeMode="cover"></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={{
                  uri: 'https://github.com/DesignIntoCode/ReactProfile02/blob/master/assets/media1.jpg',
                }}
                style={styles.image}
                resizeMode="cover"></Image>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 100,
    overflow: 'hidden',
  },
  dm: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#34FFB9',
    position: 'absolute',
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: '#41444B',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: '50%',
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.38)',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: '#CABFAB',
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
});
