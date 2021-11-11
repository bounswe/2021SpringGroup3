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
  AsyncStorage,
  ScrollView,
} from 'react-native';
import {COLORS} from '../theme/colors';
import {AXIOS_CLIENT} from '../services/axiosCientService';
import {TEXT, CONFIG, KEYS} from '../constants';

export default function Login({navigation}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const passwordInputRef = createRef();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    let token = await AsyncStorage.getItem(KEYS.TOKEN_KEY);
    if (token) {
      navigateMain();
    }
  };

  const handleLogin = () => {
    Keyboard.dismiss();
    if (CONFIG.skipLogin) {
      AsyncStorage.setItem(KEYS.USER_NAME_KEY, userName);
      navigateMain();
    } else if (userName.length > 0 && password.length > 0) {
      requestLogin();
    } else {
      ToastAndroid.show(TEXT.loginMissingInput, ToastAndroid.SHORT);
    }
  };

  const requestLogin = () => {
    AXIOS_CLIENT.post('login', {
      data: {
        userName: userName,
        password: password,
      },
    })
      .then(response => {
        if (response.status === 200) {
          AsyncStorage.setItem(KEYS.TOKEN_KEY, response.data.token);
          AsyncStorage.setItem(KEYS.USER_NAME_KEY, userName);
          navigateMain();
        } else if (
          response.status === 400 ||
          response.status === 401 ||
          response.status === 405
        ) {
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(TEXT.unexpectedError, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.info(error);
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
      <ScrollView
        keyboardShouldPersistTaps="handled"
        styles={styles.contentContainerStyle}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://www.astajans.com/Upload/urunler-upload/img_96.png',
            }}
            style={styles.imageStyle}
          />
        </View>
        <KeyboardAvoidingView enabled>
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
              <Text style={styles.buttonTextStyle}>Giriş Yap</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={navigateRegister}>
            <View>
              <Text style={styles.buttonTextStyle}>Kayıt Ol</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
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
