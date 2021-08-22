import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { getTimelineDocRef, getUserId } from "../lib/firebase";
import { AppState, module } from "../modules/Reducers";
import { Timeline } from "../types/timeline";
import { Alert } from "react-native";

const useTimeline = () => {
  const { timeline, userId } = useSelector((state: AppState) => state);
  const { setUserId, setTimeline } = module.actions;
  const dispatch = useDispatch();

  const postTimeline = async (value: string, uid: string | undefined) => {
    const textLength = Array.from(value).length;
    if (textLength > 0 && textLength < 200) {
      const docRef = await getTimelineDocRef();
      const newTimeline = {
        text: value,
        createdAt: firebase.firestore.Timestamp.now(),
        userId: uid,
      } as Timeline;
      await docRef.set(newTimeline);
    } else {
      Alert.alert("投稿文字数は1字以上200字以下です");
    }
  };

  const getTimeline = () => {
    const pastTimeline = [] as Timeline[];
    let retensionMessage = [] as Timeline[];
    let isPastFlag: boolean = true;
    firebase
      .firestore()
      .collection("timeline")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().map((change) => {
          const { text, userId } = change.doc.data();
          if (change.type === "added" && isPastFlag) {
            pastTimeline.unshift({
              // "いいね"機能実装するときはここに"like"プロパティ用意してみたいな感じかな
              text: text,
              userId: userId,
            } as Timeline);
          } else {
            retensionMessage.unshift({
              text: text,
              userId: userId,
            } as Timeline);
            const currentTimeline = [
              ...retensionMessage,
              ...pastTimeline,
            ] as Timeline[];
            dispatch(setTimeline(currentTimeline));
          }
        });
        if (isPastFlag) {
          isPastFlag = false;
          dispatch(setTimeline(pastTimeline));
        }
      });
  };

  const signIn = async () => {
    const uid = await getUserId();
    dispatch(setUserId(uid));
  };

  return {
    timeline,
    userId,
    postTimeline,
    getTimeline,
    signIn,
  };
};

export default useTimeline;
