import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, ImageBackground, View, FlatList } from 'react-native';
import Message from '../components/Message';
import Icon from '../components/Icon';
import Demo from '../assets/Demo.js'; // Assuming Demo is your data
import styles from '../assets/styles';

const Messages = ({ user }) => {
  // State to store users with matches and messages
  const [matchedUsers, setMatchedUsers] = useState([]);

  useEffect(() => {
    // Filter users who have matches with the passed-in user
    const usersWithMatches = Demo.filter(u => user.match.includes(u.id));
    
    // Map each matched user to include only necessary details
    const matchedUsersData = usersWithMatches.map(u => {
      // Get the last message for each match
      const match = user.match.find(id => id === u.id);
      const lastMessage = match ? u.messages[0].conversation[u.messages[0].conversation.length - 1].content : '';
      return {
        id: u.id,
        name: u.charactername,
        uri: u.uri,
        lastMessage: lastMessage ? lastMessage : '', // Set the last message content or empty string if no message
      };
    });

    // Set the state with matched users
    setMatchedUsers(matchedUsersData);
  }, [user]);

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
        <View style={styles.top}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity>
            <Text style={styles.icon}>
              <Icon name="ellipsis-vertical" />
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={matchedUsers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Message
                image={item.uri}
                name={item.name}
                lastMessage={item.lastMessage}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Messages;
