import firebase from "firebase";

export type Users = {
  name: string;
  createdAt: firebase.firestore.Timestamp;
  userId: string;
};
