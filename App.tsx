import React from "react";
import ChatScreen from "./src/screens/ChatScreen";
import HomeScreen from "./src/screens/HomeScreen";
import TimelineScreen from "./src/screens/TimelineScreen";
import { Provider } from "react-redux";
import { store } from "./src/modules/Reducers";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import EnterScreen from "./src/screens/EnterScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name="MiniSNS" component={EnterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat Room" component={ChatScreen} />
            <Stack.Screen name="Timeline" component={TimelineScreen} />
          </Stack.Navigator>
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
