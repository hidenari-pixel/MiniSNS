import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMessageDocRef, getUserId } from "../lib/firebase";
import firebase from "firebase";
import { AppState, AppDispatch, module } from "../modules/Reducers";
import { Message } from "../types/Message";

const useChatScreen = () => {
  const { messages, userId } = useSelector((state: AppState) => state);
  const { setMessages, setUserId } = module.actions;
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
    let retensionMessage = [] as Message[];
    let isPastFlag: boolean = true;
    const messagesDB = firebase.firestore().collection("message");
    messagesDB.orderBy("createdAt").onSnapshot((snapshot) => {
      snapshot.docChanges().map((change) => {
        const { text, userId } = change.doc.data();
        if (change.type === "added" && isPastFlag) {
          pastMessages.unshift({
            text: text,
            userId: userId,
          } as Message);
        } else {
          retensionMessage.unshift({
            text: text,
            userId: userId,
          } as Message);
          const currentMessage = [
            ...retensionMessage,
            ...pastMessages,
          ] as Message[];
          dispatch(setMessages(currentMessage));
        }
      });
      if (isPastFlag) {
        isPastFlag = false;
        dispatch(setMessages(pastMessages));
      }
    });
  };

  const signIn = async () => {
    const uid = await getUserId();
    dispatch(setUserId(uid));
  };

  return {
    messages,
    userId,
    sendMessage,
    getMessages,
    signIn,
  };
};

export default useChatScreen;
