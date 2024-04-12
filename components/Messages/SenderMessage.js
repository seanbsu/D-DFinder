import React from "react";
import { View, Text } from "react-native";

const SenderMessage = ({ message, timestamp }) => {
  return (
    <View style={{ alignSelf: "flex-start", marginHorizontal: 10, marginVertical: 5 }}>
      <View
        style={{
          backgroundColor: "#6A5ACD",
          borderRadius: 10,
          borderBottomRightRadius: 0,
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: "white" }}>{message}</Text>
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

export default SenderMessage;
