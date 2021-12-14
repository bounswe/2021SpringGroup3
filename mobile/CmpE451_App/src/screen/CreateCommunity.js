import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  ToastAndroid,
  ScrollView,
  Switch,
} from 'react-native';
import FieldHeader from '../component/FieldHeader';
import CommonButton from '../component/CommonButton';
import ScreenHeader from '../component/ScreenHeader';
import {COLORS} from '../theme/colors';
import {textInputArea} from '../theme/styles';
import {textInputContainer} from '../theme/styles';
import {headerTextStyle} from '../theme/styles';
import * as Client from '../services/BoxyClient';

export default function CreateCommunity({navigation}) {
  const [name, setName] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleCreateCommunity = async () => {
    Keyboard.dismiss();
    let response = await Client.createCommunity({
      name: name,
      iconUrl: iconUrl,
      description: description,
      isPrivate: isEnabled,
    });
    const status = response.status;
    if (status === 201) {
      navigate();
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  };

  const navigate = async () => {
    navigation.navigate('Main');
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={styles.container}>
      <ScreenHeader
        titleComponent={<Text style={headerTextStyle}>Create Community</Text>}
        navigate={navigate}
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>
          <View style={textInputContainer}>
            <FieldHeader name={'Community Name'} />
            <TextInput
              multiline
              style={textInputArea}
              onChangeText={UserName => setName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Community Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={textInputContainer}>
            <FieldHeader name={'Community Photo'} />
            <TextInput
              multiline
              style={textInputArea}
              onChangeText={IconUrl => setIconUrl(IconUrl)}
              underlineColorAndroid="#f000"
              placeholder="Icon URL"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              onSubmitEditing={() => Keyboard.dismiss()}
              blurOnSubmit={false}
            />
          </View>
          <View style={textInputContainer}>
            <FieldHeader name={'Community Description'} />
            <TextInput
              multiline
              style={textInputArea}
              onChangeText={desc => setDescription(desc)}
              underlineColorAndroid="#f000"
              placeholder="Description"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              onSubmitEditing={() => Keyboard.dismiss()}
              blurOnSubmit={false}
            />
          </View>
          <View style={textInputContainer}>
            <FieldHeader name={'Private Community'} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{color: COLORS.textColor, fontSize: 12, width: '80%'}}>
                Only members can view posts of the private communities
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <CommonButton
              text="CREATE"
              onPress={handleCreateCommunity}
              buttonWidth={'80%'}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 25,
    alignSelf: 'center',
    color: COLORS.textColor,
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});
