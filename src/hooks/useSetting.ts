import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import { AppDispatch, AppState, module } from "../modules/Reducers";
import { NavigationProps } from "../types/navigation";

const useSetting = () => {
  const { userId, docId } = useSelector((state: AppState) => state);
  const { setLogin, setDocId, setUsers } = module.actions;
  const dispatch: AppDispatch = useDispatch();

  const getUserDocId = async () => {
    const usersDB = firebase.firestore().collection("users");
    const querySnapshot = await usersDB.where("userId", "==", userId).get();
    querySnapshot.forEach((user) => {
      dispatch(setDocId(user.id));
    });
  };

  const changeName = (newName: string, props: NavigationProps) => {
    const newNameLength = Array.from(newName).length;
    if (newNameLength > 0 && newNameLength < 20) {
      Alert.alert("名前を更新しました");
      props.navigation.goBack("setting");
      const usersDB = firebase.firestore().collection("users");
      usersDB
        .doc(docId)
        .update({
          name: newName,
        })
        .then(() => {
          usersDB.onSnapshot((snapshot) => {
            const usersName = [] as string[];
            snapshot.docs.map((user) => {
              const userName = user.data().name;
              usersName.push(userName);
            });
            dispatch(setUsers(usersName));
          });
        });
    } else {
      Alert.alert("名前は1文字以上20字以下で登録してください");
    }
  };

  const showAlert = () => {
    Alert.alert("確認", "本当に削除してもよろしいですか?", [
      {
        text: "戻る",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "削除", onPress: () => deleteAccount() },
    ]);
  };

  const deleteAccount = () => {
    const usersDB = firebase.firestore().collection("users");
    usersDB
      .doc(docId)
      .delete()
      .then(() => {
        usersDB.onSnapshot((snapshot) => {
          const usersName = [] as string[];
          snapshot.docs.map((user) => {
            const userName = user.data().name;
            usersName.push(userName);
          });
          dispatch(setUsers(usersName));
          dispatch(setLogin(false));
        });
      });
  };

  return {
    userId,
    getUserDocId,
    changeName,
    showAlert,
  };
};

export default useSetting;
