import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState, appSlice } from "../modules/Modules";
import { getUserId } from "../lib/firebase";
import firebase from "firebase";
import { Users } from "../types/users";
import { Images } from "../types/images";

const useUsersInfomation = () => {
  const { users, userId, isLogin, images, defaultImage } = useSelector(
    (state: AppState) => state
  );
  const { setUsers, setUserId, setImages } = appSlice.actions;
  const dispatch: AppDispatch = useDispatch();

  const getUsers = async () => {
    const registeredUsers = [] as Users[];
    let allUsers = [] as Users[];
    const usersDB = firebase.firestore().collectionGroup("users");
    usersDB.onSnapshot((snapshot) => {
      snapshot.docChanges().map((change) => {
        if (change.type === "added") {
          const { userId, name } = change.doc.data();
          const user = { userId: userId, name: name } as Users;
          registeredUsers.push(user);
          allUsers = [...registeredUsers];
        } else if (change.type === "modified") {
          const { userId } = change.doc.data();
          const modifiedName = change.doc.data().name;
          const currentUsers: Users[] = JSON.parse(
            JSON.stringify(registeredUsers)
          );
          const modifiedUser = { userId: userId, name: modifiedName } as Users;
          const userIndex = currentUsers.findIndex(
            (user) => user.userId === userId
          );
          const updateUsers = currentUsers.splice(userIndex, 1, modifiedUser);
          allUsers = [...updateUsers];
        } else if (change.type === "removed") {
          const { userId } = change.doc.data();
          const deletedName = change.doc.data().name;
          const deletedUser = { userId: userId, name: deletedName } as Users;
          const currentUsers = JSON.parse(JSON.stringify(registeredUsers));
          const updatedusers = currentUsers.filter(
            (user: string) =>
              JSON.stringify(user) !== JSON.stringify(deletedUser)
          );
          allUsers = [...updatedusers];
        }
      });
      dispatch(setUsers(allUsers));
    });
  };

  const signIn = async () => {
    const uid = await getUserId();
    dispatch(setUserId(uid));
  };

  const getImages = () => {
    const registerdImages = [] as Images[];
    let allImages = {} as Images[];
    const db = firebase.firestore();
    db.collectionGroup("images").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const docId = change.doc.id;
          const { image } = change.doc.data();
          const newImage = { userId: docId, image: image } as Images;
          registerdImages.push(newImage);
          allImages = [...registerdImages];
        } else if (change.type === "modified") {
          const docId = change.doc.id;
          const modifiedImage = change.doc.data().image;
          const updateImage = { userId: docId, image: modifiedImage } as Images;
          const currentImages: Images[] = JSON.parse(
            JSON.stringify(registerdImages)
          );
          const imageIndex = currentImages.findIndex(
            (item) => item.userId === docId
          );
          const updateImages = currentImages.splice(imageIndex, 1, updateImage);
          allImages = [...updateImages];
        }
      });
      dispatch(setImages(allImages));
    });
  };

  const showName = (users: Users[], userId: string) => {
    const userIndex = users.findIndex((user) => user.userId === userId);
    const name = users[userIndex].name;
    return name !== undefined ? name : "unknown";
  };

  const showImage = (images: Images[], userId: string) => {
    const imageIndex = images.findIndex((item) => item.userId === userId);
    const image = images[imageIndex].image;
    return image !== undefined ? image : undefined;
  };

  return {
    isLogin,
    users,
    userId,
    images,
    defaultImage,
    signIn,
    getUsers,
    showName,
    getImages,
    showImage,
  };
};

export default useUsersInfomation;
