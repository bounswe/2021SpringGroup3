import React, {useState} from 'react';
import {
  Text,
  Linking,
  View,
  ToastAndroid,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import {SettingsPage, NavigateRow, BaseRow} from 'react-native-settings-view';

import {COLORS} from '../theme/colors';
import {headerTextStyle} from '../theme/styles';
import {textInputArea} from '../theme/styles';
import {textInputContainer} from '../theme/styles';
import ScreenHeader from '../component/ScreenHeader';
import FieldHeader from '../component/FieldHeader';
import CommonButton from '../component/CommonButton';
import * as client from '../services/BoxyClient';
import {removeToken} from '../services/asyncStorageService';
import RNRestart from 'react-native-restart';

export default function Settings({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState();

  const navigate = async () => {
    navigation.navigate('Main');
  };

  async function handleDeleteAccount() {
    let response = await client.deleteAccount();
    if (response.status / 100 == 2) {
      await removeToken();
      RNRestart.Restart();
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  }

  async function handleChangePassword() {
    const body = {
      password: password,
    };
    let response = await client.changePassword({body: body});

    if (response.status / 100 == 2) {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        titleComponent={<Text style={headerTextStyle}>Settings</Text>}
        navigate={navigate}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={textInputContainer}>
              <FieldHeader name={'New Password'} />
              <TextInput
                multiline
                style={textInputArea}
                onChangeText={newPassword => setPassword(newPassword)}
                value={password}
                underlineColorAndroid="#f000"
                placeholder="Enter your new password"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <CommonButton
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                text={'Cancel'}
                buttonWidth={'40%'}
                buttonMarginRight={4}
              />
              <CommonButton
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  handleChangePassword();
                  setModalVisible(!modalVisible);
                }}
                text={'Confirm'}
                buttonWidth={'40%'}
                buttonMarginLeft={4}
              />
            </View>
          </View>
        </View>
      </Modal>
      <SettingsPage>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionText}>ACCOUNT</Text>
        </View>
        <NavigateRow
          text="Change password"
          leftIcon={{
            name: 'cog',
            type: 'font-awesome',
            color: COLORS.buttonColor,
          }}
          onPress={() => setModalVisible(true)}
        />
        <NavigateRow
          text="Delete Account"
          leftIcon={{
            name: 'account-remove',
            type: 'material-community',
            color: COLORS.buttonColor,
          }}
          onPress={() => {
            handleDeleteAccount();
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
};
