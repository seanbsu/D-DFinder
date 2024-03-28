// SplashScreen.js
import React, { useState } from 'react';
import { Dimensions, View, Animated, Text, Image } from 'react-native';
import styles from '../assets/styles';

const SplashScreen = () => {
    return (
        <View style={styles.splash_container}>
            <Image style={styles.splash_logo} source={require('../assets/icon.jpg')} />
            <Text style={styles.splash_text}>D & D Finder</Text>
        </View>
    );
}

export default SplashScreen; // Make sure to export the component as default
