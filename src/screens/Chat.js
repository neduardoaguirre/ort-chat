import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, database } from "../config/firebase";
import { getUser } from "../providers/user.provider";

const colors = {
  primary: "blue",
  gray: "#C5C5C7",
  mediumGray: "#F6F7FB",
  lightGray: "#FAFAFA",
};

export default function Chat() {
  const navigation = useNavigation();

  const user = getUser();

  const [messages, setMessages] = useState([]);

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              marginRight: 10,
            }}
            onPress={() => navigation.navigate("Profile")}
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
              marginRight: 10,
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
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
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

    console.log("Message to send: ", messages[0]);

    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      renderAvatarOnTop={true}
      messages={messages}
      showAvatarForEveryMessage={true}
      placeholder="Mensaje"
      showUserAvatar={true}
      onSend={(messages) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      textInputStyle={{
        backgroundColor: "#fff",
        borderRadius: 20,
      }}
      user={{
        _id: user.uid,
        avatar: user?.cloudinary?.url ?? "https://i.pravatar.cc/300",
      }}
    />
  );
}
