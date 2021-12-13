import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import Config from 'react-native-config';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
import DrawerNavigator from './src/AppNavigator';

export default function App() {
  Geocoder.init(Config.GOOGLE_MAPS_API_KEY);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
