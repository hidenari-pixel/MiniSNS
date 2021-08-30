import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhNtsRGvdY44kXlLLd26QG8eOKJw_5q9M",
  authDomain: "chatapppractice-91c36.firebaseapp.com",
  projectId: "chatapppractice-91c36",
  storageBucket: "chatapppractice-91c36.appspot.com",
  messagingSenderId: "318065732324",
  appId: "1:318065732324:web:69ef15b20b6927d511daf1",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const getMessageDocRef = async () => {
  return await firebase.firestore().collection("message").doc();
};

export const getTimelineDocRef = async () => {
  return await firebase.firestore().collection("timeline").doc();
};

export const getUserId = async () => {
  const userCredential = await firebase.auth().signInAnonymously();
  return userCredential.user?.uid;
};
