import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState, module } from "../modules/Reducers";
import { getUserId } from "../lib/firebase";
import firebase from "firebase";

const useUsersInfomation = () => {
  const { users, isLogin } = useSelector((state: AppState) => state);
  const { setUsers, setUserId } = module.actions;
  const dispatch: AppDispatch = useDispatch();

  const getUsers = () => {
    const registeredUsers = [] as string[];
    let newUsers = [] as string[];
    let cleanedUp = false;
    const usersDB = firebase.firestore().collection("users");
    usersDB.onSnapshot((snapshot) => {
      snapshot.docChanges().map((change) => {
        if (change.type === "added") {
          const { userId } = change.doc.data();
          const currentName = change.doc.data().name;
          registeredUsers.push({
            [userId]: currentName,
          } as string);
          newUsers = [...registeredUsers];
        } else if (change.type === "modified") {
          const { userId } = change.doc.data();
          const newName = change.doc.data().name;
          const modifiedUser = {
            [userId]: newName,
          } as string;
          const userIndex = registeredUsers.map((item) =>
            Object.keys(item).indexOf(userId)
          )[0];
          const updateUsers = JSON.parse(
            JSON.stringify(registeredUsers)
          ).splice(userIndex, 1, modifiedUser);
          newUsers = [...updateUsers];
        } else if (change.type === "removed") {
          const { userId } = change.doc.data();
          const deletingName = change.doc.data().name;
          const deletedUser = {
            [userId]: deletingName,
          } as string;
          const updatedusers = JSON.parse(
            JSON.stringify(registeredUsers)
          ).filter(
            (user: string) =>
              JSON.stringify(user) !== JSON.stringify(deletedUser)
          );
          newUsers = [...updatedusers];
        }
      });
      if (!cleanedUp) {
        dispatch(setUsers(newUsers));
        cleanedUp = true;
      }
    });
  };

  const signIn = async () => {
    const uid = await getUserId();
    dispatch(setUserId(uid));
  };

  const showName = (users: string[], userId: any) => {
    const name = users.map((item) => {
      if (Object.keys(item).includes(userId)) {
        return item[userId];
      }
    });
    return name === undefined ? "unknown" : name;
  };

  const getUserName = (users: string[], userId: any) => {
    const userName = users.filter((user) => Object.keys(user)[0] === userId);
    return userName.length === 0 ? "unknown" : userName[0][userId];
  };

  return {
    isLogin,
    users,
    signIn,
    getUsers,
    showName,
    getUserName,
  };
};

export default useUsersInfomation;
