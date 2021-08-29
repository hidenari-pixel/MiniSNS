import React from "react";
import StackNavigationScreen from "./src/screens/StackNavigationScreen";
import { Provider } from "react-redux";
import { store } from "./src/modules/Reducers";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Provider store={store}>
          <StackNavigationScreen />
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
