import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar as HomeStatusBar } from "expo-status-bar";
import { Button, Text, View } from "native-base";
import { NavigationProps } from "../types/navigation";

const HomeScreen = (props: NavigationProps) => {
  return (
    <SafeAreaView style={HomeScreenStyles.container}>
      <HomeStatusBar style="dark" />
      <View style={HomeScreenStyles.buttonStyleContainer}>
        <Button
          onPress={() => props.navigation.navigate("Chat Room")}
          rounded="full"
        >
          <Text>Chat</Text>
        </Button>
      </View>
      <View style={HomeScreenStyles.buttonStyleContainer}>
        <Button
          onPress={() => props.navigation.navigate("Timeline")}
          rounded="full"
        >
          <Text>Timeline</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonStyleContainer: {
    width: 100,
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
});
