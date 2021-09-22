import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/modules/Modules";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import BottomTabNavigationScreen from "./src/screens/BottomTabNavigationScreen";
import StackScreen from "./src/screens/StackScreen";

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Provider store={store}>
          <StackScreen />
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
