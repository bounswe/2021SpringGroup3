import { SettingsScreen } from "react-native-settings-screen"
import React from 'react';
import {View, Text} from 'react-native';

const data: SettingsData = [
  { type: 'CUSTOM_VIEW', key: 'hero', render: this.renderHero },
  {
    type: 'SECTION',
    header: 'My Section'.toUpperCase(),

    rows: [
      {
        title: 'Account',
        showDisclosureIndicator: true,
      },
      {
        title: 'Terms and conditions',
        showDisclosureIndicator: true,
      },
      {
        title: 'Privacy Policy',
        showDisclosureIndicator: true,
      },
      {
        title: 'Delete Account',
        showDisclosureIndicator: true,
      },
      { title: 'Contact us' },
]