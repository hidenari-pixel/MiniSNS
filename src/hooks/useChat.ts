import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMessageDocRef } from "../lib/firebase";
import firebase from "firebase";
import { AppState, AppDispatch, module } from "../modules/Reducers";
import { Message } from "../types/Message";

const useChat = () => {
  const { messages, userId } = useSelector((state: AppState) => state);
  const { setMessages } = module.actions;
  const dispatch: AppDispatch = useDispatch();

  const sendMessage = async (value: string, uid: string | undefined) => {
    if (value != "") {
      const docRef = await getMessageDocRef();
      const newMessage = {
        text: value,
        createdAt: firebase.firestore.Timestamp.now(),
        userId: uid,
      } as Message;
      await docRef.set(newMessage);
    } else {
      Alert.alert("メッセージを入力してください");
    }
  };

  const getMessages = () => {
    const pastMessages = [] as Message[];
    let cleanedUp: boolean = false;
    const messagesDB = firebase.firestore().collection("message");
    messagesDB.orderBy("createdAt").onSnapshot((snapshot) => {
      snapshot.docChanges().map((change) => {
        const { text, userId } = change.doc.data();
        if (change.type === "added" && !cleanedUp) {
          pastMessages.unshift({
            text: text,
            userId: userId,
          } as Message);
        }
      });
      if (!cleanedUp) {
        dispatch(setMessages(pastMessages));
        cleanedUp = true;
      }
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
