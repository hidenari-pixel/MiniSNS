import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Timeline } from "../types/timeline";

type Props = {
  userId: string | undefined;
  userName: string | number;
  item: Timeline;
};

export const TimelineItem: React.FC<Props> = ({ item, userName }: Props) => {
  return (
    <View style={TimelineItemStyles.container}>
      <View style={TimelineItemStyles.postContainer}>
        <Text style={TimelineItemStyles.userName}>{item.userId}</Text>
        <Text style={TimelineItemStyles.postedText}>{item.text}</Text>
        <TouchableOpacity style={TimelineItemStyles.likeButtonContainer}>
          <Text style={TimelineItemStyles.likeButton}>♡</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TimelineItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#999",
  },
  postContainer: {
    width: "100%",
    height: "100%",
    paddingTop: 10,
    paddingLeft: 3,
    backgroundColor: "#fff",
  },
  userName: {
    width: "50%",
    fontSize: 10,
    color: "#999",
    paddingBottom: 10,
  },
  postedText: {
    paddingTop: 5,
    paddingLeft: 3,
  },
  likeButtonContainer: {
    alignSelf: "flex-end",
    paddingTop: 30,
    paddingBottom: 5,
    paddingRight: 25,
  },
  likeButton: {
    color: "red",
    fontSize: 25,
  },
});
