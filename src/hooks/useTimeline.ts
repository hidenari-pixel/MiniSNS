import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import { AppState, AppDispatch, module } from "../modules/Reducers";
import { Timeline } from "../types/timeline";

const useTimeline = () => {
  const [timelinePosts, setPosts] = useState<Timeline[]>([]);
  const { postIndex, userId, users } = useSelector((state: AppState) => state);
  const { setIndex } = module.actions;
  const dispatch: AppDispatch = useDispatch();

  const postTimeline = async (value: string, uid: string | undefined | any) => {
    const textLength = Array.from(value).length;
    if (textLength > 0 && textLength < 200) {
      const timelineDocRef = firebase
        .firestore()
        .collection("timeline")
        .doc(`doc${postIndex}`);
      const userName = users
        .map((user) => user[uid])
        .filter((element) => element !== undefined);
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
    let cleanedUp: boolean = false;
    let newPosts = [] as Timeline[];
    timelineDB.orderBy("createdAt").onSnapshot((snapshot) => {
      snapshot.docChanges().map((change) => {
        if (change.type === "added") {
          const { index, text, userId, like, createdAt } = change.doc.data();
          pastTimelinePosts.unshift({
            createdAt: createdAt,
            index: index,
            text: text,
            userId: userId,
            like: like,
          } as Timeline);
          newPosts = [...pastTimelinePosts];
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
          newPosts = [...pastTimelinePosts];
        }
      });
      if (!cleanedUp) {
        setPosts(newPosts);
        dispatch(setIndex(newPosts.length));
      }
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

  return {
    timelinePosts,
    userId,
    postTimeline,
    getTimeline,
    sendLike,
  };
};

export default useTimeline;
