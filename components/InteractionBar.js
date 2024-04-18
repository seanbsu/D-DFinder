import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../assets/styles';
import Icon from './Icon';

export default function InteractionBar({ onLike, onDislike, name,toggleProfile }) {
  const navigation = useNavigation();

  return (
    <View style={styles.interactionBar}>
      <TouchableOpacity >
        <Text style={styles.interactname}>{name}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity onPress={onDislike}>
          <Image source={require('../assets/xicon.png')} style={styles.redx} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleProfile}>
          <Icon name="person-circle-outline" size={50} color='white'  />
        </TouchableOpacity>

        <TouchableOpacity onPress={onLike}>
          <Image source={require('../assets/checkmark.png')} style={styles.check} />
        </TouchableOpacity>

      </View>
    </View>
  );
}
