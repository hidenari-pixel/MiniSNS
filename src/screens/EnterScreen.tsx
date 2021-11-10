import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Button } from "native-base";
import firebase from "firebase/compat/app";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native-safe-area-context";
import useEnter from "../hooks/useEnter";
import useUsersInfomation from "../hooks/useUsersInfomation";

const EnterScreen = () => {
  const [text, setText] = useState<string>("");
  const { isLoading, userId, enterHome, registerName } = useEnter();
  const { signIn, getUsers, getImages } = useUsersInfomation();

  useEffect(() => {
    signIn();
    getUsers();
    getImages();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        enterHome(userId);
      }
    });
  }, []);

  return (
    <SafeAreaView style={EnterScreenStyle.container}>
      <Spinner
        visible={isLoading}
        textContent="Loading..."
        overlayColor="rgba(0, 0, 0, 0.6)"
      />
      <Input
        w="100%"
        onChangeText={(value) => setText(value)}
        placeholder="名前を入力してください"
        _light={{ placeholderTextColor: "blueGray.400" }}
        _dark={{ placeholderTextColor: "blueGray.50" }}
        value={text}
        InputRightElement={
          <Button
            ml={1}
            roundedLeft={0}
            roundedRight="md"
            onPress={() => {
              registerName(text, userId);
              setText("");
            }}
          >
            登録
          </Button>
        }
      />
    </SafeAreaView>
  );
};

export default EnterScreen;

const EnterScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  loadingSpinner: {
    alignSelf: "center",
    paddingLeft: 80,
  },
});
