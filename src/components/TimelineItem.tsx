import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { IconButton } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import useTimeline from "../hooks/useTimeline";
import useUsersInfomation from "../hooks/useUsersInfomation";
import { Timeline } from "../types/timeline";

type Props = {
  userId: string;
  item: Timeline;
};

export const TimelineItem: React.FC<Props> = ({ item, userId }: Props) => {
  const { sendLike } = useTimeline();
  const { users, images, defaultImage, showImage, showName } =
    useUsersInfomation();
  const userName = showName(users, item.userId);
  const imageUri =
    images.length === undefined ? defaultImage : showImage(images, item.userId);

  return (
    <View style={TimelineItemStyles.container}>
      <View style={TimelineItemStyles.postContainer}>
        <View style={TimelineItemStyles.profielContaner}>
          <Image source={{ uri: imageUri }} style={TimelineItemStyles.image} />
          <Text style={TimelineItemStyles.userName}>
            {userName}
            {" の投稿"}
            {"  "}
            <Text style={{ marginLeft: 10 }}>
              {dayjs(item.createdAt.toDate()).format("YYYY/MM/DD HH:mm")}
            </Text>
          </Text>
        </View>
        <Text style={TimelineItemStyles.postedText}>{item.text}</Text>
        <View style={TimelineItemStyles.likeButtonContainer}>
          <IconButton
            mb={1}
            rounded="full"
            style={TimelineItemStyles.likeButton}
            onPress={() => {
              sendLike(item.postId, item.userId, userId);
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
    borderBottomWidth: 0.2,
    borderColor: "#999",
  },
  postContainer: {
    width: "100%",
    height: "100%",
    paddingTop: 10,
    paddingLeft: 3,
    backgroundColor: "#fff",
  },
  profielContaner: {
    flexDirection: "row",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  userName: {
    width: "50%",
    fontSize: 10,
    color: "#003",
    paddingTop: 10,
    paddingBottom: 20,
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
