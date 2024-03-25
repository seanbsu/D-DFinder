import React, { useState } from 'react';
import { Dimensions, View, Animated,Text } from 'react-native';
import NavBar from './NavBar.js';
import ProfileScreen from './ProfileScreen';
import Demo from '../assets/Demo';
import UserCard from './UserCard';
import styles from '../assets/styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Users = Demo;

export const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();
  const [showProfile, setShowProfile] = useState(false);

  const handleLike = () => {
    Animated.spring(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const handleDislike = () => {
    Animated.spring(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  return (
    <View style={styles.container}>
      {!showProfile && <NavBar displayProfile={() => setShowProfile(true)} />}
      <View style={styles.contentContainer}>
        {!showProfile && currentIndex < Users.length && (
          <View style={styles.cards}>
            <UserCard
              user={Users[currentIndex]}
              position={position}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          </View>
        )}
        {showProfile && <ProfileScreen closeProfile={() => setShowProfile(false)} />}
      </View>
    </View>
  );
}
