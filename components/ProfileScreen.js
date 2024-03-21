import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = ({ closeProfile }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.profileText}>Profile Holder</Text>
        <TouchableOpacity onPress={closeProfile}>
          <Text style={styles.closeButton}>Close Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // Cover the entire screen
    backgroundColor: 'black', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%', // Adjust the width as needed
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
  },
  profileText: {
    fontSize: 24,
    color: 'white',
  },
  closeButton: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default ProfileScreen;
