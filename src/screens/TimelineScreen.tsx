import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import useTimeline from "../hooks/useTimeline";
import { StatusBar as TimelineStatusBar } from "expo-status-bar";
import { FlatList } from "react-native-gesture-handler";
import { TimelineItem } from "../components/TimelineItem";
import { Timeline } from "../types/timeline";
import useUsersInfomation from "../hooks/useUsersInfomation";

const TimelineScreen = () => {
  const { timelinePosts, userId, getTimeline } = useTimeline();
  const { images, signIn, getImages } = useUsersInfomation();
  const { getUsers } = useUsersInfomation();

  useEffect(() => {
    signIn();
    getUsers();
    getTimeline();
    getImages();
  }, [JSON.stringify(images)]);

  return (
    <SafeAreaView style={TimelineScreenStyles.container}>
      <TimelineStatusBar style="dark" />
      <FlatList
        data={timelinePosts}
        renderItem={({ item }: { item: Timeline }) => (
          <TimelineItem userId={userId} item={item} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
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
