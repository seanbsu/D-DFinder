import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  name: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
  },
  interactionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Position buttons at opposite ends
    marginTop: 10,
    width: '100%',
  },
  check: {
    width: 50,
    height: 50,
  },
  redx: {
    width: 60,
    height: 60,
  },
});

export default function InteractionBar() {
  return (
    <View style={styles.interactionBar}>
      <Text style={styles.name}>Name</Text>
      <View style={styles.buttonContainer}>
        <Image source={require('../assets/xicon.png')} style={styles.redx} />
        <Image source={require('../assets/checkmark.png')} style={styles.check} />
      </View>
    </View>
  );
}
