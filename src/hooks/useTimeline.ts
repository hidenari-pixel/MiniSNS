import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../lib/firebase";
import { AppState, module } from "../modules/Reducers";
import { Timeline } from "../types/timeline";
import { Alert } from "react-native";
import { useState } from "react";

const useTimeline = () => {
  const [timelinePosts, setPosts] = useState<Timeline[]>([]);
  const { postIndex, userId } = useSelector((state: AppState) => state);
  const { setIndex, setUserId, setUserNames } = module.actions;
  const dispatch = useDispatch();

  const postTimeline = async (value: string, uid: string | undefined) => {
    const textLength = Array.from(value).length;
    if (textLength > 0 && textLength < 200) {
      const timelineDocRef = firebase
        .firestore()
        .collection("timeline")
        .doc(`doc${postIndex}`);
      const newTimelinePosts = {
        text: value,
        createdAt: firebase.firestore.Timestamp.now(),
        userId: uid,
        like: [],
        index: postIndex,
      } as Timeline;
      dispatch(setIndex(postIndex + 1));
      await timelineDocRef.set(newTimelinePosts);
    } else {
      Alert.alert("投稿文字数は1字以上200字以下です");
    }
  };

  const getTimeline = () => {
    const pastTimelinePosts = [] as Timeline[];
    const timelineDB = firebase.firestore().collection("timeline");
    timelineDB.orderBy("createdAt").onSnapshot((snapshot) => {
      snapshot.docChanges().map((change) => {
        const { index, text, userId, like, createdAt } = change.doc.data();
        if (change.type === "added") {
          pastTimelinePosts.unshift({
            createdAt: createdAt,
            index: index,
            text: text,
            userId: userId,
            like: like,
          } as Timeline);
        } else if (change.type === "modified") {
          const { index, text, userId, like, createdAt } = change.doc.data();
          const modifiededPost = {
            createdAt: createdAt,
            index: index,
            text: text,
            userId: userId,
            like: like,
          } as Timeline;
          pastTimelinePosts.splice(
            pastTimelinePosts.length - index - 1,
            1,
            modifiededPost
          );
        }
      });
      setPosts(pastTimelinePosts);
      dispatch(setIndex(pastTimelinePosts.length));
    });
  };

  const sendLike = (postIndex: number, userId: string) => {
    const timelineDocDB = firebase
      .firestore()
      .collection("timeline")
      .doc(`doc${postIndex}`);

    timelineDocDB.get().then((doc) => {
      const { like } = doc.data() as any;
      if (like.includes(userId)) {
        timelineDocDB.update({
          like: firebase.firestore.FieldValue.arrayRemove(userId),
        });
      } else {
        timelineDocDB.update({
          like: firebase.firestore.FieldValue.arrayUnion(userId),
        });
      }
    });
  };

  const getUsers = () => {
    const usersDB = firebase.firestore().collection("users");
    const registeredUsers = [] as string[];
    usersDB.onSnapshot((snapshot) => {
      snapshot.docs.map((user) => {
        const uid = user.data().userId;
        const userName = user.data().name;
        registeredUsers.push({
          [uid]: userName,
        } as string);
      });
      dispatch(setUserNames(registeredUsers));
    });
  };

  const signIn = async () => {
    const uid = await getUserId();
    dispatch(setUserId(uid));
  };

  return {
    timelinePosts,
    userId,
    getUsers,
    postTimeline,
    getTimeline,
    signIn,
    sendLike,
  };
};

export default useTimeline;
