import React from "react";
import { View, Text, Image } from "react-native";

const ReceiverMessage = ({ message, receiver }) => {
  return (
    <View
      style={{
        backgroundColor: "#FF6347",
        borderRadius: 10,
        borderBottomRightRadius: 0,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 20,
        marginVertical: 5,
        marginLeft: 64,
        alignSelf: "flex-start",
        
      }}
    >
      <Image
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          position: "absolute",
          top: 0,
          left: -50,
        }}
        source={receiver.uri}
      />
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

export default ReceiverMessage;
