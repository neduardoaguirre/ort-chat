import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, database, app } from '../config/firebase';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { getUser } from '../providers/user.provider';

export default function ChatScreen({ user, route }) {
  const [messages, setMessages] = useState([]);
  const getAllMessages = async () => {
    const chatid = route.params.uid > user.uid ? user.uid + '-' + route.params.uid : route.params.uid + '-' + user.uid;
    const msgResponse = await firestore()
      .collection('Chats')
      .doc(chatid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();
    const allTheMsgs = msgResponse.docs.map((docSanp) => {
      return {
        ...docSanp.data(),
        createdAt: docSanp.data().createdAt.toDate()
      };
    });
    setMessages(allTheMsgs);
  };

  useLayoutEffect(() => {
    getAllMessages();
  }, []);

  const onSend = (msgArray) => {
    const msg = msgArray[0];
    const usermsg = {
      ...msg,
      sentBy: user.uid,
      sentTo: route.uid,
      createdAt: new Date()
    };
    setMessages((previousMessages) => GiftedChat.append(previousMessages, usermsg));
    const chatid = route.params.uid > user.uid ? user.uid + '-' + route.params.uid : route.params.uid + '-' + user.uid;
    addDoc(collection(database, 'chats'), {
      chatid,
      createdAt,
      text,
      user
    });
  };

  // firestore()
  //   .collection('Chats')
  //   .doc(chatid)
  //   .collection('messages')
  //   .add({ ...usermsg, createdAt: firestore.FieldValue.serverTimestamp() });
  // };

  return (
    <GiftedChat
      style={{ flex: 1 }}
      messages={messages}
      onSend={(text) => onSend(text)}
      user={{
        _id: user.uid
      }}
    />
  );
}
