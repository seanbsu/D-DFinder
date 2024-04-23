import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import Header from "./Header";
import ReceiverMessage from "./ReceiverMessage";
import SenderMessage from "./SenderMessage";
import Demo from "../../assets/Demo";

const MessageScreen = ({ user, matchedUserId, onPressBack, isUnMatch }) => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [matchedUser, setMatchedUser] = useState(null);

  useEffect(() => {
    const matchedMessages = user.messages.find(
      (message) => message.matchId === matchedUserId
    );

    if (matchedMessages) {
      const foundMatch = Demo.find((item) => item.id === matchedUserId);
      if (foundMatch) {
        setMatchedUser(foundMatch);

        const initialConversation = matchedMessages.conversation.map(
          (message) => ({
            id: message.senderId === user.id ? user.id : foundMatch.id,
            senderId: message.senderId,
            content: message.content,
            timestamp: message.timestamp,
          })
        );
        // Sort conversation by timestamp
        initialConversation.sort((a, b) => a.timestamp - b.timestamp);
        setConversation(initialConversation);
      } else {
        setMatchedUser(null);
        setConversation([]);
      }
    }
  }, [matchedUserId]);

  const sendMessage = () => {
    const newMessage = {
      senderId: user.id,
      recipientId: matchedUser.id,
      content: input,
      timestamp: Date.now(),
    };
    const updatedConversation = [...conversation, newMessage]; // Add new message to the end of the conversation array
    // Sort conversation by timestamp
    updatedConversation.sort((a, b) => a.timestamp - b.timestamp);
    setConversation(updatedConversation);
    setInput("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={matchedUser ? matchedUser.charactername : "User"}
        callEnabled
        onBackPress={onPressBack}
        isUnMatch={isUnMatch}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={conversation}
            keyExtractor={(item) => item.timestamp.toString()}
            renderItem={({ item }) => {
              if (item.senderId === user.id) {
                return (
                  <SenderMessage
                    message={item.content}
                    timestamp={item.timestamp}
                  />
                );
              } else {
                return (
                  <ReceiverMessage
                    receiver={matchedUser}
                    message={item.content}
                    timestamp={item.timestamp}
                  />
                );
              }
            }}
          />
        </TouchableWithoutFeedback>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: "#ccc",
            padding: 10,
          }}>
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginRight: 10,
              paddingHorizontal: 10,
            }}
            placeholder="Send Message..."
            onChangeText={(text) => setInput(text)}
            value={input}
          />
          <Button
            title="Send"
            onPress={sendMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;
