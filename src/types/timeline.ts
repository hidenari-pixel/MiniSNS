import firebase from "firebase";

export type Timeline = {
  text: string;
  createdAt: firebase.firestore.Timestamp;
  userId: string;
  like: string[];
  index: number;
};
