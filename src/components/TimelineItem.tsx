import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTimeline from "../hooks/useTimeline";
import useUsersInfomation from "../hooks/useUsersInfomation";
import { Timeline } from "../types/timeline";
import dayjs from "dayjs";

type Props = {
  userId: string;
  item: Timeline;
};

export const TimelineItem: React.FC<Props> = ({ item, userId }: Props) => {
  const { sendLike } = useTimeline();
  const { users, showName } = useUsersInfomation();
  const userName = showName(users, item.userId);

  return (
    <View style={TimelineItemStyles.container}>
      <View style={TimelineItemStyles.postContainer}>
        <Text style={TimelineItemStyles.userName}>
          {userName}
          {" の投稿"}
          {"  "}
          <Text style={{ marginLeft: 10 }}>
            {dayjs(item.createdAt.toDate()).format("YYYY/MM/DD HH:mm")}
          </Text>
        </Text>
        <Text style={TimelineItemStyles.postedText}>{item.text}</Text>
        <View style={TimelineItemStyles.likeButtonContainer}>
          <IconButton
            mb={1}
            rounded="full"
            style={TimelineItemStyles.likeButton}
            onPress={() => {
              sendLike(item.index, userId);
            }}
            icon={
              <MaterialCommunityIcons
                color={item.like.includes(userId) ? "#FF3333" : "#999"}
                size={20}
                name="heart"
              />
            }
          />
          <Text style={TimelineItemStyles.numberOfLikes}>
            {item.like.length}
          </Text>
        </View>
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
    paddingBottom: 15,
  },
  likeButtonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingRight: 10,
  },
  likeButton: {
    width: 50,
  },
  numberOfLikes: {
    paddingTop: 8,
    color: "#999",
    fontSize: 15,
  },
});
