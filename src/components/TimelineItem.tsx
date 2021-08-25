import React from "react";
import dayjs from "dayjs";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useTimeline from "../hooks/useTimeline";
import useUsersInfomation from "../hooks/useUsersInfomation";
import { Timeline } from "../types/timeline";

type Props = {
  userId: string;
  item: Timeline;
};

export const TimelineItem: React.FC<Props> = ({ item, userId }: Props) => {
  const { sendLike } = useTimeline();
  const { users, showName } = useUsersInfomation();
  const userName = showName(users, item.userId);
  console.log(item.createdAt.toDate());
  return (
    <View style={TimelineItemStyles.container}>
      <View style={TimelineItemStyles.postContainer}>
        <Text style={TimelineItemStyles.userName}>
          {"<"}
          {userName}
          {"> の投稿"}
          {"  "}
          <Text style={{ marginLeft: 10 }}>
            {dayjs(item.createdAt.toDate()).format("YYYY/MM/DD HH:mm")}
          </Text>
        </Text>
        <Text style={TimelineItemStyles.postedText}>{item.text}</Text>
        <TouchableOpacity
          onPress={() => {
            sendLike(item.index, userId);
          }}
          style={TimelineItemStyles.likeButtonContainer}
        >
          <Text style={TimelineItemStyles.likeButton}>
            ♡
            <Text style={TimelineItemStyles.numberOfLikes}>
              {item.like.length}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TimelineItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 0.8,
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
    color: "#003",
    paddingBottom: 10,
    paddingLeft: 8,
  },
  postedText: {
    paddingTop: 5,
    paddingLeft: 3,
  },
  likeButtonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingTop: 30,
    paddingBottom: 5,
    paddingRight: 25,
  },
  likeButton: {
    color: "red",
    fontSize: 23,
  },
  numberOfLikes: {
    paddingBottom: 0,
    color: "#999",
    fontSize: 18,
  },
});
