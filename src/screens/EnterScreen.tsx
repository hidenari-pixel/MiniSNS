import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { StyleSheet } from "react-native";
import { Container, Input, Button } from "native-base";
import useEnterScreen from "../hooks/useEnter";
import Spinner from "react-native-loading-spinner-overlay";

const EnterScreen = () => {
  const [text, setText] = useState<string>("");
  const { isLoading, userId, signIn, enterHome, registerName } =
    useEnter();

  useEffect(() => {
    signIn();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        enterHome(userId);
      }
    });
  }, []);

  return (
    <Container flex={1} style={EnterScreenStyle.container}>
      <Spinner
        visible={isLoading}
        textContent="Loading..."
        overlayColor="rgba(0, 0, 0, 0.6)"
      />
      <Input
        w="100%"
        mx={10}
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
    </Container>
  );
};

export default EnterScreen;

const EnterScreenStyle = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  loadingSpinner: {
    alignSelf: "center",
    paddingLeft: 80,
  },
});
