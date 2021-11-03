import React from 'react';
import Chat from './src/screen/Chat';
import CreatePost from './src/screen/CreatePost';
import Search from './src/screen/Search';
import Main from './src/screen/Main.js';
import Notification from './src/screen/Notification';
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
          name="Home"
          component={BottomTabs}
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
        activeTintColor: 'red',
        inactiveTintColor: 'rgba(0,0,0, 0.5)',
        showLabel: true,
      }}>
      <Tab.Screen
        name="Main"
        component={Main}
        listeners={({navigation, route}) => {
          BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
          });
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        listeners={({navigation, route}) => ({})}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        listeners={({navigation, route}) => ({})}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        listeners={({navigation, route}) => ({})}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        listeners={({navigation, route}) => ({})}
      />
    </Tab.Navigator>
  );
}
