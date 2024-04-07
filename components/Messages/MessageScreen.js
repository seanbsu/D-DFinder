import React, { useEffect, useState } from "react";
import { SafeAreaView, View, TextInput, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, FlatList } from "react-native";
import Header from "./Header";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import Demo from '../assets/Demo';

const MessageScreen = ({ user }) => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [matchedUser, setMatchedUser] = useState(null);

  const sendMessage = () => {
    const newMessage = {
      userId: user.id,
      message: input,
      timestamp: Date.now()
    };
    setConversation(prevConversation => [...prevConversation, newMessage]);
    setInput("");
  };

 useEffect(() => {
  // Find the matched user
  const foundMatch = Demo.find(item => item.match.includes(user.id));

  if (foundMatch) {
    setMatchedUser(foundMatch);

    // Prepare initial conversation with matched user's message and user's message
    const initialConversation = [
      {
        id: foundMatch.id,
        userId: foundMatch.id,
        message: foundMatch.message,
        user: foundMatch
      },
      {
        id: user.id,
        userId: user.id,
        message: user.message, // Include the user's message
        user: user
      }
    ];
    setConversation(initialConversation);
    console.log(initialConversation);
  } else {
    setMatchedUser(null);
    setConversation([]);
  }
}, []);


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
            data={conversation}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              
              if (item.userId === user.id) {
                // Render sender message
                return <SenderMessage message={item.message} />;
              } else {
                // Render receiver message
                return <ReceiverMessage receiver={item.user} message={item.message} />;
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
