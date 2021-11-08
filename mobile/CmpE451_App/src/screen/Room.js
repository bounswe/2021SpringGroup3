import {useLinkProps} from '@react-navigation/native';
import React, {
  Component,
  useState,
  useCallback,
  useEffect,
  StyleSheet,
} from 'react';
import {
  Platform,
  Button,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import io from 'socket.io-client/dist/socket.io';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Room({navigation, route}) {
  const [count, setCount] = React.useState(0);
  const {room, user, id} = route.params;
  const [messages, setMessages] = useState([]);
  const [messageId, setMessageId] = useState('');

  function typing() {
    console.log('TYPING');
  }

  const onSend = useCallback(([message]) => {
    message.user.avatar = user.profilePic;
    message.received = false;
    setMessages(previousMessages => {
      GiftedChat.append([message], previousMessages);
      return [message, ...previousMessages];
    });
  }, []);
  return (
    <GiftedChat
      showAvatarForEveryMessage={false}
      isLoadingEarlier={true}
      forceGetKeyboardHeight={false}
      placeholder="Merhaba"
      isTyping={()=>typing()}
      onInputTextChanged={text => {
        if (text) console.log('****************');
      }}
      messages={messages}
      inverted={true}
      onSend={onSend}
      user={{_id: id}}
    />
  );
}
