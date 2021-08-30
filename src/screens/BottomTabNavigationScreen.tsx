import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "./ChatScreen";
import TimelineScreen from "./TimelineScreen";
import StackSettingScreen from "./StackSettingScreen";
import useUsersInfomation from "../hooks/useUsersInfomation";
import EnterScreen from "./EnterScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BottomTabNavigationScreen = () => {
  const BottomTab = createBottomTabNavigator();
  const { isLogin } = useUsersInfomation();
  if (!isLogin) {
    return <EnterScreen />;
  }

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1E90FF",
      }}
    >
      <BottomTab.Screen
        name="TL"
        component={TimelineScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="view-list"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="CHAT"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="chat" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="SETTINGS"
        component={StackSettingScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account-settings"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigationScreen;
