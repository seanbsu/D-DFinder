import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/styles';

const ProfileScreen = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.profilecontainer}>
        <Text style={styles.profileText}>Profile Holder</Text>
      </View>
    </View>
  );
};


export default ProfileScreen;
