import React from "react";
import { useSelector } from "react-redux";
import ChatScreen from "./ChatScreen";
import HomeScreen from "./HomeScreen";
import TimelineScreen from "./TimelineScreen";
import EnterScreen from "./EnterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { AppState } from "../modules/Reducers";

const Stack = createStackNavigator();

const StackNavigatorScreen = () => {
  const { isLogin } = useSelector((state: AppState) => state);
  if (!isLogin) {
    return <EnterScreen />;
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat Room" component={ChatScreen} />
        <Stack.Screen name="Timeline" component={TimelineScreen} />
      </Stack.Navigator>
    );
  }
};

export default StackNavigatorScreen;
