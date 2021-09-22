import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Button, Text, View } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProps } from "../types/navigation";
import useTimeline from "../hooks/useTimeline";

const PostScreen = (props: NavigationProps) => {
  const [text, setText] = useState<string>("");
  const { userId, postTimeline } = useTimeline();
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", position: "relative" }}>
        <View style={{ padding: 15 }}>
          <Button
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{ flexDirection: "row" }}
            backgroundColor="transparent"
          >
            <Text style={{ color: "#1e90ff" }}>キャンセル</Text>
          </Button>
        </View>
        <View style={{ padding: 15, position: "absolute", right: 5 }}>
          <Button
            onPress={() => {
              postTimeline(text, userId, props);
              setText("");
            }}
            style={{
              borderWidth: 1,
              borderRadius: 100,
              borderColor: "#1e90ff",
              backgroundColor: "#1e90ff",
            }}
            backgroundColor="rgba(0, 0, 0, 0)"
          >
            投稿する
          </Button>
        </View>
      </View>
      <View style={postScreenStyles.container}>
        <TextInput
          multiline={true}
          editable
          placeholder="1字以上200字以下"
          onChangeText={(text) => setText(text)}
          maxLength={200}
          value={text}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          returnKeyType="done"
        />
      </View>
    </SafeAreaView>
  );
};

export default PostScreen;

const postScreenStyles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingTop: 10,
  },
});
