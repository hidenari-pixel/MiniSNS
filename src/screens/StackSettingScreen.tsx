import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChangeNameScreen from "./ChangeNameScreen";
import DeleteAccountScreen from "./DeleteAccountScreen";
import SettingScreen from "./SettingScreen";

const StackSettingScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="setting" component={SettingScreen} />
      <Stack.Screen name="change" component={ChangeNameScreen} />
      <Stack.Screen name="delete" component={DeleteAccountScreen} />
    </Stack.Navigator>
  );
};

export default StackSettingScreen;
