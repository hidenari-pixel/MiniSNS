import React, { useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { Button, Text, Box } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProps } from "../types/navigation";
import useUsersInfomation from "../hooks/useUsersInfomation";
import useSetting from "../hooks/useSetting";

const SettingScreen = (props: NavigationProps) => {
  const {
    users,
    userId,
    images,
    defaultImage,
    getUsers,
    showName,
    showImage,
    getImages,
  } = useUsersInfomation();
  const { confirmOpen } = useSetting();
  const imageUri =
    images.length === undefined ? defaultImage : showImage(images, userId);
  const userName = showName(users, userId);

  useEffect(() => {
    getUsers();
    getImages();
  }, [JSON.stringify(users), JSON.stringify(images)]);

  return (
    <SafeAreaView style={SettingScreenStyle.container}>
      <Box style={{ alignItems: "center" }}>
        <Image
          source={{ uri: imageUri }}
          style={SettingScreenStyle.imageStyle}
        />
        <Text style={SettingScreenStyle.nameStyle}>{userName}</Text>
      </Box>
      <Box style={{ padding: 20 }}>
        <Button
          onPress={() => {
            confirmOpen(userId);
          }}
          rounded="full"
        >
          <Text>画像を変更する</Text>
        </Button>
      </Box>
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
  imageBoxStyle: {
    alignItems: "center",
  },
  nameStyle: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
  imageStyle: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});
