import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Button,
  FlatList,
  Platform,
} from "react-native";
import useChatScreen from "../hooks/useChatScreen";
import { StatusBar as ChatStatusBar } from "expo-status-bar";
import { useHeaderHeight } from "@react-navigation/elements";
import { Message } from "../types/Message";
import { MessageItem } from "../components/MessageItem";

const ChatScreen = () => {
  const [text, setText] = useState<string>("");
  const { messages, userId, sendMessage, getMessages, signIn } =
    useChatScreen();
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    signIn();
    getMessages();
  }, []);

  return (
    <SafeAreaView style={ChatScreenStyles.container}>
      <ChatStatusBar style="dark" />
      <KeyboardAvoidingView
        style={ChatScreenStyles.keyboardAvoidingView}
        behavior="padding"
        keyboardVerticalOffset={Platform.select({
          ios: headerHeight,
          android: headerHeight + 10,
        })}
      >
        <FlatList
          style={ChatScreenStyles.messageContainer}
          data={messages}
          inverted={true}
          renderItem={({ item }: { item: Message }) => (
            <MessageItem userId={userId} item={item} userName={""} />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
        <View style={ChatScreenStyles.inputTextContainer}>
          <TextInput
            style={ChatScreenStyles.inputText}
            onChangeText={(value) => {
              setText(value);
            }}
            value={text}
            placeholder="メッセージを入力してください"
            placeholderTextColor="#777"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
          />
          <Button
            title="送信"
            color="#007AFF"
            onPress={() => {
              sendMessage(text, userId);
              setText("");
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const ChatScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    color: "#333",
    borderWidth: 1,
    borderColor: "#999",
    height: 32,
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputTextContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  messageContainer: {
    width: "100%",
    padding: 10,
  },
  keyboardAvoidingView: {
    width: "100%",
    flex: 1,
  },
  userNameText: {
    color: "#ccc",
  },
});
