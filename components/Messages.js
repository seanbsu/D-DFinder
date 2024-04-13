import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, ImageBackground, View, FlatList } from 'react-native';
import Message from '../components/Message';
import Icon from '../components/Icon';
import Demo from '../assets/Demo.js'; 
import styles from '../assets/styles';
import MessageScreen from './Messages/MessageScreen'; 

const Messages = ({ user }) => {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 

  useEffect(() => {
    
    const usersWithMatches = Demo.filter(u => user.match.includes(u.id));
    
   
    const matchedUsersData = usersWithMatches.map(u => {
     
      const match = user.messages.find(message => message.matchId === u.id);
      const lastMessage = match ? match.conversation[match.conversation.length - 1].content : '';
      return {
        id: u.id,
        name: u.charactername,
        uri: u.uri,
        lastMessage: lastMessage ? lastMessage : '', 
      };
    });

    setMatchedUsers(matchedUsersData);
  }, [user]);

  const handlePressMessage = (user) => {
    setSelectedUser(user); 
  };

  const goBack = () => {
    setSelectedUser(null); 
  };

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
        <View style={styles.messagestop}>
          <Text style={styles.title}>Messages</Text>
        </View>

        {/* Conditionally render MessageScreen if a user is selected */}
        {selectedUser && (
          <MessageScreen user={user} matchedUserId={selectedUser.id} onPressBack={goBack} />
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
