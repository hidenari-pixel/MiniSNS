import { Alert } from "react-native";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { AppState, AppDispatch, module } from "../modules/Reducers";
import { Users } from "../types/users";

const useEnter = () => {
  const { userId, isLogin, isLoading } = useSelector(
    (state: AppState) => state
  );
  const { setLogin } = module.actions;
  const dispatch: AppDispatch = useDispatch();

  const enterHome = (userId: string) => {
    const registeredUsers = [] as string[];
    const usersDB = firebase.firestore().collection("users");
    usersDB.onSnapshot((snapshot) => {
      snapshot.docs.map((user) => {
        const uid = user.data().userId;
        registeredUsers.unshift(uid);
        if (userId === uid) {
          const registeredPayload = {
            isLogin: true,
            isLoading: false,
          };
          dispatch(setLogin(registeredPayload));
        }
      });
      if (!registeredUsers.includes(userId)) {
        const unRegisteredPayload = {
          isLogin: false,
          isLoading: false,
        };
        dispatch(setLogin(unRegisteredPayload));
      }
    });
  };

  const registerName = async (value: string, uid: string | undefined) => {
    const nameLength = Array.from(value).length;
    if (nameLength > 0 && nameLength < 20) {
      const usersDBRef = firebase.firestore().collection("users").doc();
      const newUser = {
        name: value,
        createdAt: firebase.firestore.Timestamp.now(),
        userId: uid,
      } as Users;
      const payload = {
        isLoading: true,
        isLogin: true,
      };
      dispatch(setLogin(payload));
      await usersDBRef.set(newUser);
    } else {
      Alert.alert("名前は1字以上20字以下で登録してください");
    }
  };

  return {
    userId,
    isLogin,
    isLoading,
    enterHome,
    registerName,
  };
};

export default useEnter;
