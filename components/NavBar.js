// NavBar.js
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../assets/styles';


export default function NavBar({ displayProfile }) {
  return (
    <View style={styles.nav}>
      <Image style={styles.logo} source={require('../assets/icon.jpg')} />
      <Text style={styles.navtitle}>D &amp; D Finder</Text>

        <View style={styles.logo}  />
      
    </View>
  );
}
