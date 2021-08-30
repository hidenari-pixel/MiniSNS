import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/modules/Reducers";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import BottomTabNavigationScreen from "./src/screens/BottomTabNavigationScreen";

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Provider store={store}>
          <BottomTabNavigationScreen />
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
