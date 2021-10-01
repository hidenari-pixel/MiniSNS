import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

console.log(firebaseConfig);

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const getMessageDocRef = async (uid: string | undefined) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("messages");
};

export const getTimelineDocRef = async (uid: string | undefined) => {
  return firebase.firestore().collection("users").doc(uid).collection("posts");
};

export const getUserId = async () => {
  const userCredential = await firebase.auth().signInAnonymously();
  return userCredential.user?.uid;
};

export const getImageDocRef = async (uid: string | undefined) => {
  return firebase.firestore().collection("users").doc(uid).collection("images");
};
