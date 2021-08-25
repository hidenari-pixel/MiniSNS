import { Alert } from "react-native";
import firebase from "firebase";
import { getUserId } from "../lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { AppState, module } from "../modules/Reducers";
import { NavigationProps } from "../types/navigation";
import { Users } from "../types/users";

const useEnterScreen = () => {
  const { userId } = useSelector((state: AppState) => state);
  const { setUserId } = module.actions;
  const dispatch = useDispatch();

  const enterHome = (props: NavigationProps, userId: string) => {
    const registeredUsers = [] as string[];
    const usersDB = firebase.firestore().collection("users");
    usersDB.onSnapshot((snapshot) => {
      snapshot.docs.map((user) => {
        const uid = user.data().userId;
        registeredUsers.unshift(uid);
        if (userId === uid) {
          props.navigation.navigate("Home");
        }
      });
    });
  };

  const registerName = async (
    value: string,
    uid: string | undefined,
    props: NavigationProps
  ) => {
    const nameLength = Array.from(value).length;
    if (nameLength > 0 && nameLength < 20) {
      const usersDBRef = firebase.firestore().collection("users").doc();
      const newUser = {
        name: value,
        createdAt: firebase.firestore.Timestamp.now(),
        userId: uid,
      } as Users;
      props.navigation.navigate("Home");
      await usersDBRef.set(newUser);
    } else {
      Alert.alert("名前は1字以上20字以下で登録してください");
    }
  };

  const signIn = async () => {
    const uid = await getUserId();
    dispatch(setUserId(uid));
  };

  return {
    userId,
    signIn,
    enterHome,
    registerName,
  };
};

export default useEnterScreen;
