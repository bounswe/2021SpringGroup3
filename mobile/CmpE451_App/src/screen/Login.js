import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

import {COLORS} from '../theme/colors';
import {storeToken, getToken} from '../services/asyncStorageService';
import {TEXT, CONFIG, BASE_URL} from '../constants';
import {appLogo} from '../image/index';

export default function Login({navigation}) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const passwordInputRef = createRef();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    let token = await getToken();
    if (token) {
      navigateMain();
    }
  };

  const handleLogin = () => {
    Keyboard.dismiss();
    if (CONFIG.skipLogin) {
      navigateMain();
    } else if (username.length > 0 && password.length > 0) {
      requestLogin();
    } else {
      ToastAndroid.show(TEXT.loginMissingInput, ToastAndroid.SHORT);
    }
  };

  const requestLogin = () => {
    fetch(BASE_URL + 'auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Platform': 'ANDROID',
      },
    })
      .then(async response => {
        const status = response.status;
        response = await response.json();
        if (status === 200) {
          CONFIG.token = response.token;
          await storeToken(response.token);
          navigateMain();
        } else {
          ToastAndroid.show(response.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.info(error.message);
        ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
      });
  };

  const navigateMain = async () => {
    navigation.navigate('Home');
  };

  const navigateRegister = async () => {
    Keyboard.dismiss();
    navigation.navigate('Registration');
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <View
        keyboardShouldPersistTaps="handled"
        style={styles.contentContainerStyle}>
        <KeyboardAvoidingView
          enabled
          style={{flex: 1, justifyContent: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Image source={appLogo} style={styles.imageStyle} />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Email / Kullanıcı Adı"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
              value={username}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              ref={passwordInputRef}
              onChangeText={UserPassword => setPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Şifre"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() => Keyboard.dismiss()}
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleLogin}>
            <View>
              <Text style={styles.buttonTextStyle}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={navigateRegister}>
            <View>
              <Text style={styles.buttonTextStyle}>Register</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      <View style={{flex: 1}} />
    </View>
  );
}

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.buttonColor,
    borderWidth: 0,
    color: COLORS.buttonColor,
    borderColor: COLORS.buttonColor,
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: COLORS.buttonTextColor,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: COLORS.inputTextColor,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  contentContainerStyle: {
    flex: 6,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageStyle: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    margin: 30,
  },
});
