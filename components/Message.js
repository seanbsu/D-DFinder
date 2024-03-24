import React from 'react';
import { Text, View, Image,StyleSheet, Dimensions } from 'react-native';
import styles from '../assets/styles';

const Message = ({ image, lastMessage, name }) => {
  return (
    <View style={styles.containerMessage}>
      <Image source={image} style={styles.avatar} />
      <View style={styles.content}>
        <Text>{name}</Text>
        <Text style={styles.message}>{lastMessage}</Text>
      </View>
    </View>
  );
};
export default Message;