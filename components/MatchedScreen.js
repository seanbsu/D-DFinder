import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Demo from '../assets/Demo';
import styles from '../assets/styles';

const MatchedScreen = ({ user, matchedUserID }) => {
  
const matchedUser = Demo.find(item => item.id === matchedUserID);
console.log(matchedUser);
  return (
    <View style={styles.matchedContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.matchedImage}
          source={require("../assets/its-a-match.png")}
        />
      </View>
      <Text style={styles.matchedText}>
        You and {matchedUser.charactername} have liked each other.
      </Text>
      <View style={styles.avatarsContainer}>
        <Image
          style={styles.matchAvatar}
          source={ user.uri }
        />
        
       <Image
        style={styles.matchAvatar}
        source={matchedUser.uri}
      />

      </View>
    </View>
  );
};


export default MatchedScreen;
