import React from 'react';
import {BackHandler} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Login from './screen/Login';
import Chat from './screen/Chat';
import CreatePost from './screen/CreatePost';
import Search from './screen/Search';
import Main from './screen/Main.js';
import Notification from './screen/Notification';
import Registration from './screen/Registration';
import Profile from './screen/Profile';
import Settings from './screen/Settings';
import CreateCommunity from './screen/CreateCommunity';
import Logout from './screen/Logout';

import Icon from 'react-native-vector-icons/Ionicons';
import {screenOptionStyle} from './theme/styles';
import {COLORS} from './theme//colors';
import styled from 'styled-components/native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {KEYS} from './constants';

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
          } else if (route.name === 'CreatePost') {
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
        options={screenOptionStyle}
        name="CreatePost"
        component={CreatePost}
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

const drawerOptions = {
  headerShown: false,
  drawerActiveBackgroundColor: COLORS.drawerActiveBackgroundColor,
  drawerActiveTintColor: COLORS.buttonTextColor,
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <FakeDrawerHeader>
        <AppTitle> BOXY </AppTitle>
      </FakeDrawerHeader>
      <DrawerItemList {...props} />
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
      drawerContent={props => {
        return <CustomDrawerContent {...props} />;
      }}>
      <Drawer.Screen
        name="Home"
        component={Navigator}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="Create Community"
        component={CreateCommunity}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={drawerOptions}
      />
      <Drawer.Screen name="Logout" component={Logout} options={drawerOptions} />
    </Drawer.Navigator>
  );
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
