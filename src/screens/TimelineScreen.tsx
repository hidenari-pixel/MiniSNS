import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import useTimeline from "../hooks/useTimeline";
import { useHeaderHeight } from "@react-navigation/elements";
import { StatusBar as TimelineStatusBar } from "expo-status-bar";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { TimelineItem } from "../components/TimelineItem";
import { Timeline } from "../types/timeline";

const TimelineScreen = () => {
  const [text, setText] = useState<string>("");
  const { timelinePosts, userId, getUsers, postTimeline, getTimeline, signIn } =
    useTimeline();
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    signIn();
    getUsers();
    getTimeline();
  }, []);

  return (
    <SafeAreaView style={TimelineScreenStyles.container}>
      <TimelineStatusBar style="dark" />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.select({
          ios: headerHeight,
          android: headerHeight + 10,
        })}
        style={TimelineScreenStyles.keyboardAvoidingView}
      >
        <FlatList
          data={timelinePosts}
          renderItem={({ item }: { item: Timeline }) => (
            <TimelineItem userId={userId} item={item} />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
        <View style={TimelineScreenStyles.inputTextContainer}>
          <TextInput
            style={TimelineScreenStyles.inputText}
            onChangeText={(value) => setText(value)}
            value={text}
            placeholder="1字以上200字以下"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
          />
          <Button
            title="投稿"
            onPress={() => {
              postTimeline(text, userId);
              setText("");
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TimelineScreen;

const TimelineScreenStyles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  inputText: {
    flex: 1,
    color: "#333",
  },
  inputTextContainer: {
    width: "100%",
    flexDirection: "row",
  },
  keyboardAvoidingView: {},
});
