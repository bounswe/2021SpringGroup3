import React from 'react';

import {
  SectionRow,
  SettingsPage,
  NavigateRow,
  BaseRow,
} from 'react-native-settings-view';
import {View, Text} from 'react-native';

export default function Profile({}) {
  return (
    <SettingsPage>
      <NavigateRow
        text="Terms and conditions"
        leftIcon={{
          name: 'file-document',
          type: 'material-community',
        }}
        onPress={() => console.log('terms')}
      />
      <NavigateRow
        text="Change Password"
        leftIcon={{
          name: 'folder-lock',
          type: 'material-community',
        }}
        onPress={() => console.log('policy')}
      />
      <BaseRow
        text="Delete Account"
        enabled
        leftIcon={{
          name: 'do-not-disturb',
          type: 'material-community',
        }}
      />
      <BaseRow
        text="Contact us"
        leftIcon={{
          name: 'users',
          type: 'font-awesome',
        }}
        onPress={() => console.log('contact')}
      />
    </SettingsPage>
  );
}
