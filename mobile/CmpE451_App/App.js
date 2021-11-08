import React from 'react';
import Chat from './src/screen/Chat';
import CreatePost from './src/screen/CreatePost';
import Search from './src/screen/Search';
import Registration from './src/screen/Registration';
import Main from './src/screen/Main.js';
import Notification from './src/screen/Notification';
import Room from './src/screen/Room'

import {BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Registration"
          component={Registration}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={BottomTabs}
        />
         <Stack.Screen
          options={{headerShown: true}}
          name="Room"
          component={Room}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({}) => {
          let iconName;
          let color;
          if (route.name === 'Main') {
            iconName = 'home';
            color = 'black'
          } else if (route.name === 'Search') {
            iconName = 'search';
            color = 'black'
          } else if (route.name === 'CreatePost') {
            iconName = 'add-circle-sharp';
            color = 'red'
          } else if (route.name === 'Chat') {
            iconName = 'chatbox';
            color = 'black'
          } else if (route.name === 'Notification') {
            iconName = 'notifications';
            color = 'black'
          }
          return <Icon name={iconName} size={23} showLabel={false} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#4400b9',
        activeTintColor: 'red',
        inactiveTintColor: 'rgba(0,0,0, 0.5)',
        showLabel: true,
      }}>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
          title: 'Anasayfa',
        }}
        listeners={({navigation, route}) => {
          BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
          });
        }}
      />
      <Tab.Screen
        name="Search"
        options={{
          headerShown: false,
          title: 'Arama',
        }}
        component={Search}
        listeners={({navigation, route}) => ({})}
      />
      <Tab.Screen
        name="CreatePost"
        options={{
          headerShown: false,
          title: 'Gönderi',
        }}
        component={CreatePost}
        listeners={({navigation, route}) => ({})}
      />
      <Tab.Screen
        name="Chat"
        options={{
          headerShown: false,
          title: 'Mesaj',
        }}
        component={Chat}
        listeners={({navigation, route}) => ({})}
      />
      <Tab.Screen
        name="Notification"
        options={{
          headerShown: false,
          title: 'Bildirimler',
        }}
        component={Notification}
        listeners={({navigation, route}) => ({})}
      />
    </Tab.Navigator>
  );
}
