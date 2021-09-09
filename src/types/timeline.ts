import firebase from "firebase";

export type Timeline = {
  createdAt: firebase.firestore.Timestamp;
  text: string;
  userId: string;
  like: string[];
  index: number;
};
