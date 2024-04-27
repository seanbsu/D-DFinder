import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  FlatList,
} from "react-native";
import Message from "../components/Message";
import Icon from "../components/Icon";
import Demo from "../assets/Demo.js";
import styles from "../assets/styles";
import MessageScreen from "./Messages/MessageScreen";
import { getRemoteProfiles } from "./RemoteHandler.js";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry.js";

const Messages = ({ user, setUser }) => {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [Users, setUsers] = useState(null);

  // getRemoteProfiles((ret)=>{
  //   console.log("Setting Users in home")
  //   setUsers(ret)
  //   console.log("Users has been set in Messages")
  // })

  useEffect(() => {
    getRemoteProfiles(loadurl).then((ret)=>{
      console.log("Setting Users in home")
      setUsers(ret)
      console.log("Users has been set in Messages")
      getMatchedUser(ret);
    })
  }, []);

  function getMatchedUser(users){
    console.log("Users in messages")
    if(users === null){
      //If Users is null then let's just not do crap
      console.error("Users is null in messages")
      return;
    }

    const usersWithMatches = users.filter((u) => user.match.includes(u.id));
    const matchedUsersData = usersWithMatches.map((u) => {
      const match = user.messages.find((message) => message.matchId === u.id);
      const lastMessage = match
        ? match.conversation[match.conversation.length - 1].content
        : "";
      return {
        id: u.id,
        name: u.charactername,
        uri: u.uri,
        lastMessage: lastMessage ? lastMessage : "",
      };
    });
    setMatchedUsers(matchedUsersData);
  }

  // useEffect(() => {
  //   if(Users === null){
  //     console.error("Null boi");
  //     return;
  //   }
  //   getMatchedUser(Users)
  // }, [user, selectedUser, Users]);

  const handlePressMessage = (user) => {
    setSelectedUser(user);
  };

  const goBack = () => {
    setSelectedUser(null);
  };
  isUnMatch = (isUnMatch) => {
    if (isUnMatch) {
      //update user match list, remove from liked list , also remove from message list fro selected user
      selectedUser.match = (selectedUser.match ?? []).filter(
        (matchId) => matchId !== user.id
      );
      selectedUser.like = (selectedUser.like ?? []).filter(
        (likedId) => likedId !== user.id
      );
      selectedUser.messages = (selectedUser.messages ?? []).filter(
        (message) => message.matchId !== user.id
      );

      //replace the selected User  and usr on Demo with updated user

      setUsers(Users.map((profile) => {
        if (profile.id === user.id) {
          return user;
        }
        if (profile.id === selectedUser.id) {
          return selectedUser;
        }
        return profile;
      }));
      //update user match list, remove from liked list , also remove from message list

      user.match = (user.match ?? []).filter(
        (matchId) => matchId !== selectedUser.id
      );

      user.like = (user.like ?? []).filter(
        (likedId) => likedId !== selectedUser.id
      );
      user.messages = (user.messages ?? []).filter(
        (message) => message.matchId !== selectedUser.id
      );

      setSelectedUser(null);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      style={styles.bg}>
      <View style={styles.containerMessages}>
        <View style={styles.messagestop}>
          <Text style={styles.title}>Messages</Text>
        </View>

        {/* Conditionally render MessageScreen if a user is selected */}
        {selectedUser && (
          <MessageScreen
            user={user}
            matchedUserId={selectedUser.id}
            onPressBack={goBack}
            isUnMatch={isUnMatch}
            setUser={setUser}
          />
        )}

        {/* Render the list of matched users */}
        {!selectedUser && (
          <FlatList
            data={matchedUsers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePressMessage(item)}>
                <Message
                  image={item.uri}
                  name={item.name}
                  lastMessage={item.lastMessage}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default Messages;
