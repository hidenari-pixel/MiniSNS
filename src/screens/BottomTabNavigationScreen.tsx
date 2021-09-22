import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import EnterScreen from "./EnterScreen";
import TimelineScreen from "./TimelineScreen";
import ChatScreen from "./ChatScreen";
import SettingScreen from "./SettingScreen";
import useUsersInfomation from "../hooks/useUsersInfomation";
import { NavigationProps } from "../types/navigation";

const BottomTabNavigationScreen = (props: NavigationProps) => {
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
          headerRight: () => (
            <FontAwesome.Button
              name="pencil-square-o"
              onPress={() => {
                props.navigation.navigate("post");
              }}
              iconStyle={{ marginLeft: 10 }}
              backgroundColor="#fff"
              color="#1e90ff"
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
        name="ACCOUNT"
        component={SettingScreen}
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
