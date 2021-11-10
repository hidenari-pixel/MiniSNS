import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import { getImageDocRef as getImageDocRef } from "../lib/firebase";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { AppDispatch, AppState, appSlice } from "../modules/Modules";
import { NavigationProps } from "../types/navigation";

const useSetting = () => {
  const { userId } = useSelector((state: AppState) => state);
  const { setLogin } = appSlice.actions;
  const dispatch: AppDispatch = useDispatch();

  const pickImage = async (userId: string) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const localUri = await fetch(result.uri);
        uploadImage(userId, result.uri, localUri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (
    userId: string,
    imageUri: string,
    localUri: Response
  ) => {
    const localBlob = await localUri.blob();
    const storageRef = firebase.storage().ref();
    const mountainsRef = storageRef.child(`images/${imageUri}`);
    await mountainsRef.put(localBlob).then(() => {
      console.log("アップロード成功");
    });
    const imageDocRef = await getImageDocRef(userId);
    await mountainsRef
      .getDownloadURL()
      .then((url: any) => {
        const newImage = {
          image: url,
        };
        imageDocRef.doc(userId).set(newImage);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const confirmOpen = (userId: string) => {
    Alert.alert("確認", " 写真 を開きますか?", [
      {
        text: "戻る",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "はい", onPress: () => pickImage(userId) },
    ]);
  };

  const changeName = async (
    newName: string,
    props: NavigationProps,
    userId: string
  ) => {
    const newNameLength = Array.from(newName).length;
    if (newNameLength > 0 && newNameLength < 20) {
      const targetDoc = firebase.firestore().collection("users").doc(userId);
      targetDoc.get().then(() => {
        targetDoc.update({
          name: newName,
        });
      });
      props.navigation.goBack();
      Alert.alert("名前を更新しました");
    } else {
      Alert.alert("名前は1文字以上20字以下で登録してください");
    }
  };

  const deleteAccount = async (userId: string) => {
    const usersDB = firebase.firestore().collection("users");
    await usersDB
      .doc(userId)
      .delete()
      .then(() => {
        dispatch(setLogin(false));
      });
  };

  const showAlert = () => {
    Alert.alert("確認", "本当に削除してもよろしいですか?", [
      {
        text: "戻る",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "削除", onPress: () => deleteAccount(userId) },
    ]);
  };

  return {
    userId,
    confirmOpen,
    changeName,
    showAlert,
  };
};

export default useSetting;
