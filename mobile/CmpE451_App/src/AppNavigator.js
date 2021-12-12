import React from 'react';

import {BackHandler, Image, Alert, ToastAndroid} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {getToken, removeToken} from './services/asyncStorageService';

import Login from './screen/Login';
import Chat from './screen/Chat';
import CreatePost from './screen/CreatePost';
import Search from './screen/Search';
import Main from './screen/Main.js';
import Notification from './screen/Notification';
import Registration from './screen/Registration';
import Profile from './screen/Profile';
import ProfileSettings from './screen/ProfileSettings';
import CreateCommunity from './screen/CreateCommunity';
import SelectCommunity from './screen/SelectCommunity';
import SelectPostType from './screen/SelectPostType';
import CreatePostType from './screen/CreatePostType';
import SelectModeratorCommunity from './screen/SelectModeratorCommunity';
import PostDetail from './screen/PostDetail';
import Communities from './screen/Communities';
import Community from './screen/Community';
import PendingRequests from './screen/PendingRequests';
import UpdateCommunity from './screen/UpdateCommunity';

import Icon from 'react-native-vector-icons/Ionicons';
import {screenOptionStyle} from './theme/styles';
import {COLORS} from './theme//colors';
import styled from 'styled-components/native';

import {TEXT, CONFIG, BASE_URL} from './constants';
import RNRestart from 'react-native-restart';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export function Navigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        options={{headerShown: false}}
        name="login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Registration"
        component={Registration}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={BottomNavigator}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PostDetail"
        component={PostDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SelectPostType"
        component={SelectPostType}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CreatePost"
        component={CreatePost}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CreatePostType"
        component={CreatePostType}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Community"
        component={Community}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PendingRequests"
        component={PendingRequests}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UpdateCommunity"
        component={UpdateCommunity}
      />
    </Stack.Navigator>
  );
}

function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({}) => {
          let iconName;
          if (route.name === 'Main') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Create Post') {
            iconName = 'add';
          } else if (route.name === 'Chat') {
            iconName = 'chatbox';
          } else if (route.name === 'Notification') {
            iconName = 'notifications';
          }
          return <Icon name={iconName} size={23} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#4400b9',
        inactiveTintColor: 'rgba(0,0,0, 0.5)',
        showLabel: true,
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Main"
        component={Main}
        listeners={({navigation, route}) => {
          BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
          });
        }}
      />
      <Tab.Screen
        options={screenOptionStyle}
        name="Search"
        component={Search}
        listeners={({navigation, route}) => ({})}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Create Post"
        component={SelectCommunity}
        listeners={({navigation, route}) => ({})}
      />
      <Tab.Screen
        options={screenOptionStyle}
        name="Chat"
        component={Chat}
        listeners={({navigation, route}) => ({})}
      />
      <Tab.Screen
        options={screenOptionStyle}
        name="Notification"
        component={Notification}
        listeners={({navigation, route}) => ({})}
      />
    </Tab.Navigator>
  );
}
const startReload = () => RNRestart.Restart();

const handleLogout = () => {
  if (CONFIG.skipLogout) {
    CONFIG.token = '';
    removeToken();
    startReload();
  } else {
    requestLogout();
  }
};

const requestLogout = async () => {
  const token = await getToken();
  console.log('token', token);
  fetch(BASE_URL + 'auth/logout', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: token,
    },
  })
    .then(async () => {
      await removeToken();
      startReload();
    })
    .catch(error => {
      console.info(error);
      ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
    });
};

const showAlert = () => {
  Alert.alert(
    'Warning',
    'Are you sure you want to logout?',
    [
      {
        text: 'Cancel',
      },
      {
        text: 'Yes',
        onPress: () => handleLogout(),
      },
    ],
    {
      cancelable: true,
    },
  );
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <FakeDrawerHeader>
        <Image
          source={{
            uri: 'https://drive.google.com/uc?export=view&id=1kQCyEbaR4_n7TjEddltSnR1sld6xcoAc',
          }}
          style={{width: 100, height: 100}}
        />
        <AppTitle> BOXY </AppTitle>
      </FakeDrawerHeader>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => showAlert()} />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={screenOptionStyle}
      drawerStyle={{backgroundColor: 'transparent'}}
      drawerType={'slide'}
      overlayColor="transparent"
      initialRouteName="Navigator"
      drawerContent={props => {
        return <CustomDrawerContent {...props} />;
      }}>
      <Drawer.Screen
        name="Navigator"
        component={Navigator}
        options={{
          drawerItemStyle: {height: 0},
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="Communities"
        component={Communities}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="Create Community"
        component={CreateCommunity}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="Create Post Type"
        component={SelectModeratorCommunity}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={drawerOptions}
      />
    </Drawer.Navigator>
  );
};

const drawerOptions = {
  headerShown: false,
  drawerActiveBackgroundColor: COLORS.drawerActiveBackgroundColor,
  drawerActiveTintColor: COLORS.buttonTextColor,
};

const FakeDrawerHeader = styled.View`
  width: 100%;
  aspect-ratio: 1.5;
  align-items: center;
  justify-content: center;
`;
const AppTitle = styled.Text`
  font-size: 22px;
  color: #00227a;
  font-weight: bold;
`;

export default DrawerNavigator;
