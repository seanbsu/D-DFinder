import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/styles';

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


export default ProfileScreen;
