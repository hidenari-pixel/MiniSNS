import React from "react";
import { StyleSheet } from "react-native";
import { Box, Input, Text, Button, View } from "native-base";
import { NavigationProps } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangeNameScreen = (props: NavigationProps) => {
  return (
    <SafeAreaView style={ChangeNameScreenStyle.container}>
      <Box style={{ paddingTop: "50%" }}>
        <Input
          w="100%"
          mx={10}
          // onChangeText={(value) => setText(value)}
          placeholder="新しい名前を入力してください"
          _light={{ placeholderTextColor: "blueGray.400" }}
          _dark={{ placeholderTextColor: "blueGray.50" }}
          // value={text}
          InputRightElement={
            <Button
              ml={1}
              roundedLeft={0}
              roundedRight="md"
              // onPress={() => {
              //   registerName(text, userId);
              //   setText("");
              // }}
            >
              登録
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
