import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState, module } from "../modules/Reducers";
import { getUserId } from "../lib/firebase";
import firebase from "firebase";

const useUsersInfomation = () => {
  const { users, isLogin } = useSelector((state: AppState) => state);
  const { setUserNames, setUserId } = module.actions;
  const dispatch: AppDispatch = useDispatch();

  // Warning: Can't perform a React state update on an unmounted component.
  //  This is a no-op, but it indicates a memory leak in your application.
  //  To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
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
        dispatch(setUserNames(newUsers));
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
    return name;
  };

  return {
    users,
    isLogin,
    signIn,
    getUsers,
    showName,
  };
};

export default useUsersInfomation;
