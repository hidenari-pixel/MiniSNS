import React from "react";
import { useSelector } from "react-redux";
import ChatScreen from "../src/screens/ChatScreen";
import HomeScreen from "./HomeScreen";
import TimelineScreen from "../src/screens/TimelineScreen";
import EnterScreen from "../src/screens/EnterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { AppState } from "../src/modules/Reducers";

const Stack = createStackNavigator();

const NavigationScreen = () => {
  const { isLogin } = useSelector((state: AppState) => state);
  if (!isLogin) {
    return <EnterScreen />;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat Room" component={ChatScreen} />
      <Stack.Screen name="Timeline" component={TimelineScreen} />
    </Stack.Navigator>
  );
};

export default NavigationScreen;
