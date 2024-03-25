import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../assets/styles';

export default function InteractionBar({ onLike, onDislike, name }) {
  const navigation = useNavigation();

  return (
    <View style={styles.interactionBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.interactname}>{name}</Text>
      </TouchableOpacity>
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
