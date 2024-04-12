import React from "react";
import { View, Text, Image } from "react-native";

const ReceiverMessage = ({ message, receiver, timestamp }) => {
  return (
    <View style={{ alignSelf: "flex-start", marginHorizontal: 10, marginVertical: 5 }}>
    <View
      style={{
        backgroundColor: "#FF6347",
        borderRadius: 10,
        borderBottomLeftRadius: 0,
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
      <Text style={{ alignSelf: "flex-end", marginTop: 5, fontSize: 12, color: "gray" }}>{formatTimestamp(timestamp)}</Text>
    </View>
  );
};
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const formattedHour = hour >= 10 ? hour : hour === 0 ? 12 : ' ' + hour; // Use a space instead of a leading zero if hour < 10
  const minute = date.getMinutes().toString().padStart(2, '0');
  const amPM = hour >= 12 ? 'PM' : 'AM';
  const formattedDate = date.toLocaleDateString();
  return `${formattedDate} ${formattedHour}:${minute} ${amPM}`;
};

export default ReceiverMessage;
