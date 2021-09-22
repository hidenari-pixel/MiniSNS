import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Box, Input, Text, Button } from "native-base";
import { NavigationProps } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import useSetting from "../hooks/useSetting";
import useUsersInfomation from "../hooks/useUsersInfomation";

const ChangeNameScreen = (props: NavigationProps) => {
  const [text, setText] = useState<string>("");
  const { userId, changeName } = useSetting();
  const { users, showName } = useUsersInfomation();
  const userName = showName(users, userId);

  return (
    <SafeAreaView style={ChangeNameScreenStyle.container}>
      <Box style={{ paddingTop: "50%" }}>
        <Input
          w="100%"
          mx={10}
          onChangeText={(value) => setText(value)}
          placeholder={`現在の名前は『${userName}』です`}
          _light={{ placeholderTextColor: "blueGray.400" }}
          _dark={{ placeholderTextColor: "blueGray.50" }}
          value={text}
          InputRightElement={
            <Button
              ml={1}
              roundedLeft={0}
              roundedRight="md"
              onPress={() => {
                changeName(text, props, userId);
                setText("");
              }}
            >
              更新
            </Button>
          }
        />
      </Box>
      <Box style={ChangeNameScreenStyle.backButton}>
        <Button onPress={() => props.navigation.goBack()}>
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
