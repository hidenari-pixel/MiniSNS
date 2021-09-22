import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import { AppState, AppDispatch, appSlice } from "../modules/Modules";
import { Timeline } from "../types/timeline";
import { getTimelineDocRef } from "../lib/firebase";
import { NavigationProps } from "../types/navigation";

const useTimeline = () => {
  const [timelinePosts, setTimelinePosts] = useState<Timeline[]>([]);
  const { userId } = useSelector((state: AppState) => state);
  const dispatch: AppDispatch = useDispatch();

  const postTimeline = async (
    value: string,
    uid: any,
    props: NavigationProps
  ) => {
    const textLength = Array.from(value).length;
    if (textLength > 0 && textLength < 200) {
      const timelineDocRef = await getTimelineDocRef(uid);
      const postId = timelineDocRef.doc().id;
      const newTimelinePosts = {
        text: value,
        createdAt: firebase.firestore.Timestamp.now(),
        userId: uid,
        like: [],
        postId: postId,
      } as Timeline;
      await timelineDocRef.doc(postId).set(newTimelinePosts);
      props.navigation.goBack();
    } else {
      Alert.alert("投稿文字数は1字以上200字以下です");
    }
  };

  const getTimeline = async () => {
    const posts = [] as Timeline[];
    let allPosts = [] as Timeline[];
    const db = firebase.firestore();
    db.collectionGroup("posts")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const { createdAt, userId, text, like, postId } = change.doc.data();
            const post = {
              createdAt: createdAt,
              userId: userId,
              text: text,
              like: like,
              postId: postId,
            } as Timeline;
            posts.unshift(post);
          } else if (change.type === "modified") {
            const { like, postId } = change.doc.data();
            posts.map((post) => {
              if (post.postId === postId) {
                post.like = like;
              }
            });
          } else if (change.type === "removed") {
            const { createdAt, userId, text, like, postId } = change.doc.data();
            const removedPost = {
              createdAt: createdAt,
              userId: userId,
              text: text,
              like: like,
              postId: postId,
            };
            posts.filter(
              (post) =>
                JSON.stringify(Object.entries(post).sort()) !==
                JSON.stringify(Object.entries(removedPost).sort())
            );
          }
        });
        allPosts = [...posts];
        setTimelinePosts(allPosts);
      });
  };

  const sendLike = (postId: string, postUserId: string, userId: string) => {
    const targetDoc = firebase
      .firestore()
      .collection("users")
      .doc(postUserId)
      .collection("posts")
      .doc(postId);
    targetDoc.get().then((doc) => {
      const { like } = doc.data() as any;
      if (like.includes(userId)) {
        targetDoc.update({
          like: firebase.firestore.FieldValue.arrayRemove(userId),
        });
      } else {
        targetDoc.update({
          like: firebase.firestore.FieldValue.arrayUnion(userId),
        });
      }
    });
  };

  const deletePost = async (postId: string, userId: string) => {
    const targetDoc = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("posts")
      .doc(postId);
    await targetDoc.delete();
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
