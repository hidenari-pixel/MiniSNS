import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChangeNameScreen from "./ChangeNameScreen";
import DeleteAccountScreen from "./DeleteAccountScreen";
import SettingScreen from "./SettingScreen";
import PostScreen from "./PostScreen";
import BottomTabNavigationScreen from "./BottomTabNavigationScreen";

const StackScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="tab" component={BottomTabNavigationScreen} />
      <Stack.Screen name="post" component={PostScreen} />
      <Stack.Screen name="setting" component={SettingScreen} />
      <Stack.Screen name="change" component={ChangeNameScreen} />
      <Stack.Screen name="delete" component={DeleteAccountScreen} />
    </Stack.Navigator>
  );
};

export default StackScreen;
