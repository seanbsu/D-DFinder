import React, { useEffect, useState } from "react";
import { SafeAreaView, View, TextInput, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, FlatList } from "react-native";
import Header from "./Header";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import Demo from '../assets/Demo';

const MessageScreen = ({ user, matchedUserId }) => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [matchedUser, setMatchedUser] = useState(null);

  const sendMessage = () => {
    const newMessage = {
      senderId: user.id,
      recipientId: matchedUser.id,
      content: input,
      timestamp: Date.now()
    };
    setConversation(prevConversation => [...prevConversation, newMessage]);
    setInput("");
  };

  useEffect(() => {
    // Find the matched user's messages in the current user's messages
    const matchedMessages = user.messages.find(message => message.matchId === matchedUserId);

    if (matchedMessages) {
      const foundMatch = Demo.find(item => item.id === matchedUserId);
      if (foundMatch) {
        setMatchedUser(foundMatch);

        // Extract conversation from matched messages
        const initialConversation = matchedMessages.conversation.map(message => ({
          id: message.senderId === user.id ? user.id : foundMatch.id,
          senderId: message.senderId,
          content: message.content,
          timestamp: message.timestamp,
        }));
        // Sort conversation by timestamp
        initialConversation.sort((a, b) => a.timestamp - b.timestamp);
        setConversation(initialConversation);
      } else {
        setMatchedUser(null);
        setConversation([]);
      }
    }
  }, [matchedUserId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={matchedUser ? matchedUser.name : "User"} callEnabled />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
              inverted
              data={conversation.reverse()} // Reverse the order of messages
              keyExtractor={item => item.timestamp.toString()}
              renderItem={({ item }) => {
                  if (item.senderId === user.id) {
                      // Render sender message
                      return <SenderMessage message={item.content} />;
                  } else {
                      // Render receiver message
                      return <ReceiverMessage receiver={matchedUser} message={item.content} />;
                  }
              }}
          />

        </TouchableWithoutFeedback>

        <View style={{ flexDirection: "row", alignItems: "center", borderTopWidth: 1, borderTopColor: "#ccc", padding: 10 }}>
          <TextInput
            style={{ flex: 1, height: 40, borderColor: "gray", borderWidth: 1, marginRight: 10, paddingHorizontal: 10 }}
            placeholder="Send Message..."
            onChangeText={text => setInput(text)}
            value={input}
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;
