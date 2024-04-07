import React from "react";
import { View, Text } from "react-native";

const SenderMessage = ({ message }) => {
  return (
    <View
      style={{
        backgroundColor: "#6A5ACD",
        borderRadius: 10,
        borderTopRightRadius: 0,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        alignSelf: "flex-start",
        marginLeft: "auto",
        width:'120'
      }}
    >
      <Text
        style={{
          color: "white"
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default SenderMessage;
