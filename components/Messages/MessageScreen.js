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
import { getRemoteProfiles, saveRemoteProfiles } from "../RemoteHandler";

loadurl="https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=ryeland"
saveurl="https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=ryeland"

const MessageScreen = ({ user, matchedUserId, onPressBack, isUnMatch, setUser }) => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [matchedUser, setMatchedUser] = useState(null);
  const [Users, setUsers] = useState(null);

  useEffect(() => {
    console.log("Requesting remote data form messages")
    getRemoteProfiles(loadurl).then((ret)=>{
      console.log("Finished loading the remote profiles in messages.")
      setUsers(ret)
    }).catch((e) => {
      console.log("Failure during setUsers")
      console.log(e)
    })
  }, [matchedUserId])

  useEffect(() => {
    if(Users === null){
      console.log("Users is not updated yet in messages...")
      return 
    }

    console.log(user)
    const matchedMessages = user.messages.find(
      (message) => message.matchId === matchedUserId
    );

    if (matchedMessages) {
      const foundMatch = Users.find((item) => item.id === matchedUserId);
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
  }, [matchedUserId, Users]);

  function updateRemote(updatedConvo){
    let newUsers = Users.map((profile) => {
      if ( profile.email === user.email) {
        for(let heck of profile.messages){
          if(heck.matchId === matchedUserId){
            console.log("Made it and pdated")
            heck.conversation = JSON.parse(JSON.stringify(updatedConvo))
            console.log(profile.messages)
            let tmpUser = {...profile}
            setUser(tmpUser)
            return tmpUser;
          }
        }
      }
      return profile;
    });

    //Updating matched user
    newUsers = Users.map((profile) => {
      if ( profile.email === matchedUser.email) {
        for(let heck of profile.messages){
          if(heck.matchId === matchedUserId){
            console.log("Made it and pdated")
            heck.conversation = JSON.parse(JSON.stringify(updatedConvo))
            console.log(profile.messages)
            let tmpUser = {...profile}
            return tmpUser;
          }
        }
      }
      return profile;
    });

    saveRemoteProfiles(saveurl, newUsers).catch((e)=>{
      console.log("ERROR updating messageScreen");
    }).then((ret)=>{
      console.log("Saved convo")
    })

  }

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
    console.log(updatedConversation)
    setConversation(updatedConversation);
    updateRemote(updatedConversation)
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
