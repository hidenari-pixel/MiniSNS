import React from "react";
import { StyleSheet } from "react-native";
import { Box, Text, Button } from "native-base";
import { NavigationProps } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";

const DeleteAccountScreen = (props: NavigationProps) => {
  return (
    <SafeAreaView style={DeleteAccountScreenStyle.container}>
      <Box style={{ paddingTop: "50%" }}>
        <Button onPress={() => {}} style={{ backgroundColor: "red" }}>
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
