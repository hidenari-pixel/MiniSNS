import React from "react";
import { View, Button, SafeAreaView, StyleSheet } from "react-native";
import { StatusBar as HomeStatusBar } from "expo-status-bar";
import { NavigationProps } from "../types/navigation";

const HomeScreen = (props: NavigationProps) => {
  return (
    <SafeAreaView style={HomeScreenStyles.container}>
      <HomeStatusBar style="dark" />
      <View style={HomeScreenStyles.buttonStyleContainer}>
        <Button
          title="Chat"
          onPress={() => props.navigation.navigate("Chat Room")}
        />
      </View>
      <View style={HomeScreenStyles.buttonStyleContainer}>
        <Button
          title="Timeline"
          onPress={() => props.navigation.navigate("Timeline")}
        />
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
