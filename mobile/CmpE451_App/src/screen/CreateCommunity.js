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
  ScrollView,
} from 'react-native';
import {COLORS} from '../theme/colors';
import {BASER_URL} from '../services/axiosCientService';
import {TEXT, CONFIG} from '../constants';

export default function CreateCommunity({navigation}) {
  const [name, setName] = useState('');
  const [iconUrl, setIconUrl] = useState('');

  const iconUrlInputRef = createRef();

  const handleCreateCommunity = () => {
    Keyboard.dismiss();
    fetch(BASER_URL + 'communities', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        iconUrl: iconUrl,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Platform': 'ANDROID',
        Authorization: CONFIG.token,
      },
    })
      .then(response => {
        if (response.status === 201) {
          navigateMain();
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

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        styles={styles.contentContainerStyle}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.header}>Create Community</Text>
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Community Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                iconUrlInputRef.current && iconUrlInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              ref={iconUrlInputRef}
              onChangeText={IconUrl => setIconUrl(IconUrl)}
              underlineColorAndroid="#f000"
              placeholder="Icon URL"
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
            onPress={handleCreateCommunity}>
            <View>
              <Text style={styles.buttonTextStyle}>Create</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  header: {
    fontSize: 25,
    alignSelf: 'center',
    color: COLORS.textColor,
  },
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
