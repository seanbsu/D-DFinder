import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../assets/styles';


export default function InteractionBar({ onLike, onDislike, name }) {
  return (
    <View style={styles.interactionBar}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.buttonContainer}>
        
      <TouchableOpacity onPress={onDislike}>
        <Image source={require('../assets/xicon.png')} style={styles.redx} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onLike}>
        <Image source={require('../assets/checkmark.png')} style={styles.check} />
        </TouchableOpacity>

      </View>
    </View>
  );
}
