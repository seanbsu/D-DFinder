import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  nav: {
    borderWidth: 1,
    paddingTop: 20,
    flexDirection: 'row'
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    marginLeft: 10,
    paddingTop: 10,
    fontSize: 32,
    color:'white',
  },
});
export default function NavBar() {
  return (
    <View style={styles.nav}>
      <Image
        style={styles.logo}
        source={require('../assets/icon.jpg')} />
      <Text style={styles.title}>
        D & D Finder
      </Text>
    </View>
  );
}
