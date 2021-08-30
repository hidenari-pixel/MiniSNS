import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useUsersInfomation from "../hooks/useUsersInfomation";
import { Message } from "../types/Message";

type Props = {
  userId: string;
  userName: string | number;
  item: Message;
};

export const MessageItem: React.FC<Props> = ({ item, userId }: Props) => {
  const { users, showName } = useUsersInfomation();
  const userName = showName(users, item.userId);
  return (
    <View>
      <Text style={messagesItemStyle.userName}>
        {userId === item.userId ? "" : userName}
      </Text>
      <View
        style={
          userId === item.userId
            ? messagesItemStyle.ownMessages
            : messagesItemStyle.elseMessages
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
  userName: {
    fontSize: 8,
    fontWeight: "bold",
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    marginBottom: 0,
  },
});
