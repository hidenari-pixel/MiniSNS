import React from "react";
import { StyleSheet } from "react-native";
import { Box, Input, Text, Button } from "native-base";
import { NavigationProps } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import useSetting from "../hooks/useSetting";
import { useEffect } from "react";
import { useState } from "react";

// < 名前変更詳細 >
//  「更新」ボタン ->
//  (未入力の場合) : ボタンはdisable
//  (入力済みの場合) : ボタンを押下後は前の画面にgoBack
// 変更の処理は
// firebase.firestore.collection("users").get().then
// で該当するユーザーのドキュメントID取得して
// firebasefirestore.collection("users").doc("ドキュメントID").set()かな

const ChangeNameScreen = (props: NavigationProps) => {
  const [text, setText] = useState<string>("");
  const { changeName } = useSetting();

  return (
    <SafeAreaView style={ChangeNameScreenStyle.container}>
      <Box style={{ paddingTop: "50%" }}>
        <Input
          w="100%"
          mx={10}
          onChangeText={(value) => setText(value)}
          placeholder="新しい名前を入力してください"
          _light={{ placeholderTextColor: "blueGray.400" }}
          _dark={{ placeholderTextColor: "blueGray.50" }}
          value={text}
          InputRightElement={
            <Button
              ml={1}
              roundedLeft={0}
              roundedRight="md"
              onPress={() => {
                changeName(text, props);
                setText("");
              }}
            >
              更新
            </Button>
          }
        />
      </Box>
      <Box style={ChangeNameScreenStyle.backButton}>
        <Button onPress={() => props.navigation.goBack("setting")}>
          <Text>前の画面に戻る</Text>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default ChangeNameScreen;

const ChangeNameScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginTop: "50%",
  },
});
