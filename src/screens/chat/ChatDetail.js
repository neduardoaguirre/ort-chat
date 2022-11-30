import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, HStack, Text } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, database } from '../../config/firebase';
import { getUser } from '../../context/userContext';

const colors = {
  primary: 'blue',
  gray: '#C5C5C7',
  mediumGray: '#F6F7FB',
  lightGray: '#FAFAFA'
};

export const ChatDetailComponent = ({ route }) => {
  const defaultAvatar = require('../../assets/default-avatar.png');
  const navigation = useNavigation();

  const user = getUser();

  const [ messages, setMessages ] = useState([]);

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            style={{
              marginRight: 10
            }}
            onPress={() => navigation.navigate('Profile')}
          >
            <AntDesign
              name="user"
              size={24}
              color={colors.gray}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginRight: 10
            }}
            onPress={onSignOut}
          >
            <AntDesign
              name="logout"
              size={24}
              color={colors.gray}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      )
    });
  }, [ navigation ]);

  useLayoutEffect(() => {

    const q = query(
      collection(database, 'messages'),
      where('roomId', '==', route.params.id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[ 0 ];

    addDoc(collection(database, 'messages'), {
      roomId: route.params.id,
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <>
      <HStack width='100%' bgColor={'gray.150'} p={5} space={3} mt={4} alignItems='center' >
        <Icon
          onPress={handleBack}
          color="blue.700"
          size={25}
          as={
            <Ionicons
              name="arrow-back"
            />
          }
        />
        <Text color='blue.700' fontWeight={'bold'} textAlign='center' fontSize={15}>{route.params.name}</Text>
      </HStack>
      <GiftedChat
        renderAvatarOnTop={true}
        messages={messages.sort((a, b) => b.createdAt - a.createdAt)}
        showAvatarForEveryMessage={true}
        placeholder="Mensaje"
        showUserAvatar={true}
        onSend={(messages) => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: '#fff'
        }}
        textInputStyle={{
          backgroundColor: '#fff',
          borderRadius: 20
        }}
        user={{
          _id: user.uid,
          avatar: user?.cloudinary?.url ?? defaultAvatar
        }}
      />
    </>
  );
};
