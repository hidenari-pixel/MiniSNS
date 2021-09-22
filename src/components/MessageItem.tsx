import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import useUsersInfomation from "../hooks/useUsersInfomation";
import { Message } from "../types/Message";

type Props = {
  userId: string;
  userName: string | number;
  item: Message;
};

export const MessageItem: React.FC<Props> = ({ item, userId }: Props) => {
  const { users, images, defaultImage, showImage, showName } =
    useUsersInfomation();
  const userName = showName(users, item.userId);
  const imageUri =
    images.length === undefined ? defaultImage : showImage(images, item.userId);
  const elseUserImage =
    item.userId !== userId ? (
      <Image source={{ uri: imageUri }} style={messagesItemStyle.image} />
    ) : null;

  return (
    <View>
      <View style={{ flexDirection: "row", paddingBottom: 8 }}>
        {elseUserImage}
        <Text style={messagesItemStyle.userName}>
          {userId === item.userId ? "" : userName}
        </Text>
      </View>
      <View
        style={
          userId !== item.userId
            ? messagesItemStyle.elseMessages
            : messagesItemStyle.ownMessages
        }
      >
        <Text style={userId === item.userId ? { color: "#fff" } : {}}>
          {item.text}
        </Text>
      </View>
    </View>
  );
};

const messagesItemStyle = StyleSheet.create({
  ownMessages: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    padding: 5,
    borderRadius: 5,
    borderTopRightRadius: 0,
    marginBottom: 5,
  },
  elseMessages: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    marginBottom: 5,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  userName: {
    fontSize: 8,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 3,
    paddingTop: 10,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    marginBottom: 0,
  },
});
