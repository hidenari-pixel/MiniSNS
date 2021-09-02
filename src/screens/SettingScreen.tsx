import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, Box } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProps } from "../types/navigation";
import useUsersInfomation from "../hooks/useUsersInfomation";
import { useEffect } from "react";
import useSetting from "../hooks/useSetting";

const SettingScreen = (props: NavigationProps) => {
  const { getUsers, signIn } = useUsersInfomation();
  const { getUserDocId } = useSetting();

  useEffect(() => {
    signIn();
    getUsers();
    getUserDocId();
  }, []);

  return (
    <SafeAreaView style={SettingScreenStyle.container}>
      <Box style={{ padding: 20 }}>
        <Button
          onPress={() => props.navigation.navigate("change")}
          rounded="full"
        >
          <Text>名前を変更</Text>
        </Button>
      </Box>
      <Box style={{ padding: 20 }}>
        <Button
          onPress={() => props.navigation.navigate("delete")}
          rounded="full"
        >
          <Text>アカウントを削除</Text>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default SettingScreen;

const SettingScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
