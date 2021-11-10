import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMessageDocRef } from "../lib/firebase";
import firebase from "firebase/compat/app";
import { AppState, AppDispatch } from "../modules/Modules";
import { Message } from "../types/Message";

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { userId } = useSelector((state: AppState) => state);

  const sendMessage = async (value: string, uid: string | undefined) => {
    if (value != "") {
      const messageDocRef = await getMessageDocRef(uid);
      const newMessage = {
        text: value,
        createdAt: firebase.firestore.Timestamp.now(),
        userId: uid,
      } as Message;
      await messageDocRef.doc().set(newMessage);
    } else {
      Alert.alert("メッセージを入力してください");
    }
  };

  const getMessages = async () => {
    const messages = [] as Message[];
    let allMessages = [] as Message[];
    const db = firebase.firestore();
    db.collectionGroup("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const { createdAt, userId, text } = change.doc.data();
            const message = {
              createdAt: createdAt,
              userId: userId,
              text: text,
            } as Message;
            messages.unshift(message);
            allMessages = [...messages];
          }
        });
        setMessages(allMessages);
      });
  };

  return {
    messages,
    userId,
    sendMessage,
    getMessages,
  };
};
export default useChat;
