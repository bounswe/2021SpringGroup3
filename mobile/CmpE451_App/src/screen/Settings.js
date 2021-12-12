import React from 'react';
import {Text, Linking, View, ToastAndroid} from 'react-native';
import {SettingsPage, NavigateRow, BaseRow} from 'react-native-settings-view';

import {COLORS} from '../theme/colors';
import {headerTextStyle} from '../theme/styles';
import ScreenHeader from '../component/ScreenHeader';

export default function Settings({navigation, route}) {
  const navigate = async () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        titleComponent={<Text style={headerTextStyle}>Settings</Text>}
        navigate={navigate}
      />
      <SettingsPage>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionText}>ACCOUNT</Text>
        </View>
        <NavigateRow
          text="Update username"
          leftIcon={{
            name: 'cog',
            type: 'font-awesome',
            color: COLORS.buttonColor,
          }}
          onPress={() => {
            ToastAndroid.show(
              'This feature will be enabled soon',
              ToastAndroid.SHORT,
            );
          }}
        />
        <NavigateRow
          text="Update email address"
          leftIcon={{
            name: 'cog',
            type: 'font-awesome',
            color: COLORS.buttonColor,
          }}
          onPress={() => {
            ToastAndroid.show(
              'This feature will be enabled soon',
              ToastAndroid.SHORT,
            );
          }}
        />
        <NavigateRow
          text="Change password"
          leftIcon={{
            name: 'cog',
            type: 'font-awesome',
            color: COLORS.buttonColor,
          }}
          onPress={() => {
            ToastAndroid.show(
              'This feature will be enabled soon',
              ToastAndroid.SHORT,
            );
          }}
        />
        <NavigateRow
          text="Delete Account"
          leftIcon={{
            name: 'account-remove',
            type: 'material-community',
            color: COLORS.buttonColor,
          }}
          onPress={() => {
            ToastAndroid.show(
              'This feature will be enabled soon',
              ToastAndroid.SHORT,
            );
          }}
        />
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionText}>ABOUT</Text>
        </View>
        <NavigateRow
          text="Terms and conditions"
          leftIcon={{
            name: 'file-document',
            type: 'material-community',
            color: COLORS.buttonColor,
          }}
          onPress={() =>
            Linking.openURL(
              'https://www.termsandconditionsgenerator.com/live.php?token=cLf9GZDmxgCe3knU2dCRJxBuhBGYayDc',
            )
          }
        />
        <NavigateRow
          text="Privacy Policy"
          leftIcon={{
            name: 'folder-lock',
            type: 'material-community',
            color: COLORS.buttonColor,
          }}
          onPress={() =>
            Linking.openURL(
              'https://www.privacypolicies.com/live/6f565800-8118-42ea-a5ec-ebec5f0dc0ca',
            )
          }
        />
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionText}>SUPPORT</Text>
        </View>
        <NavigateRow
          text="Contact us"
          leftIcon={{
            name: 'users',
            type: 'font-awesome',
            color: COLORS.buttonColor,
          }}
          onPress={() =>
            Linking.openURL('https://github.com/bounswe/2021SpringGroup3')
          }
        />
        <BaseRow
          text="version"
          leftIcon={{
            name: 'tag',
            type: 'font-awesome',
            color: COLORS.buttonColor,
          }}
          rightContent={<Text>2.0.0</Text>}
        />
      </SettingsPage>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  sectionHeaderContainer: {
    backgroundColor: '#dddddd',
    padding: 10,
  },
  sectionText: {
    color: '#555555',
    fontSize: 13,
    fontWeight: '500',
  },
};
