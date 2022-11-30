import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { database } from '../../config/Firebase';
import { getUser } from '../../context/UserContext';
import { Header } from '../../layout/Header';

export const ChatDetailComponent = ({ route }) => {
  const defaultAvatar = require('../../assets/default-avatar.png');
  const user = getUser();
  const [messages, setMessages] = useState([]);

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

    const { _id, createdAt, text, user } = messages[0];

    addDoc(collection(database, 'messages'), {
      roomId: route.params.id,
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  return (
    <>
      <Header title={route.params.name}></Header>
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
