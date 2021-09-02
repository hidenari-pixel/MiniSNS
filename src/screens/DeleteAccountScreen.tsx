import React from "react";
import { StyleSheet } from "react-native";
import { Box, Text, Button } from "native-base";
import { NavigationProps } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import useSetting from "../hooks/useSetting";

// 「削除ボタン」押下 ->  確認画面 -> 削除 -> 登録画面
// 確認画面はAlert的な感じのやつかな
// これもfirebase.firestore.collection("users").get().then
// で該当するドキュメントID取得してきてdoc("docID").deleteで削除する感じかな

const DeleteAccountScreen = (props: NavigationProps) => {
  const { showAlert } = useSetting();
  return (
    <SafeAreaView style={DeleteAccountScreenStyle.container}>
      <Box style={{ paddingTop: "50%" }}>
        <Button
          onPress={() => {
            showAlert();
          }}
          style={{ backgroundColor: "red" }}
        >
          <Text>アカウントを削除する</Text>
        </Button>
      </Box>
      <Box style={DeleteAccountScreenStyle.backButton}>
        <Button onPress={() => props.navigation.goBack("setting")}>
          <Text>前の画面に戻る</Text>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default DeleteAccountScreen;

const DeleteAccountScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginTop: "50%",
  },
});
