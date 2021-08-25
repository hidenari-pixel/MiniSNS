import React, { useEffect } from "react";
import firebase from "firebase";
import { StyleSheet } from "react-native";
import { Container, Input, Button } from "native-base";
import { NavigationProps } from "../types/navigation";
import useEnterScreen from "../hooks/useEnterScreen";
import { useState } from "react";

const EnterScreen = (props: NavigationProps) => {
  const [text, setText] = useState<string>("");
  const { userId, signIn, enterHome, registerName } = useEnterScreen();

  useEffect(() => {
    signIn();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        enterHome(props, userId);
      }
    });
  }, []);

  return (
    <Container flex={1} style={EnterScreenStyle.container}>
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
              registerName(text, userId, props);
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
});
