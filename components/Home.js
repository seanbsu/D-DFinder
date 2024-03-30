import React, { useState } from 'react';
import { Dimensions, View, Animated,Text } from 'react-native';
import NavBar from './NavBar.js';
import ProfileScreen from './ProfileScreen';
import Demo from '../assets/Demo';
import UserCard from './UserCard';
import styles from '../assets/styles';
import UserProfile from '../assets/UserProfile';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Users = Demo;
let userP = UserProfile;

export const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();
  const [showProfile, setShowProfile] = useState(false);

  const handleLike = () => {
    addMatch();
    Animated.spring(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };
    /**
   * Update the match value for the user object if the user swipes right
   */
  const addMatch = () => {
    console.log('add match1');
    // Find the object with the specific id and update its match value
    userP = userP.map(profile => {
    if (profile.id === 5) { // Assuming update the match value for the object with id 5
      const matchList = [...profile.match, Users[currentIndex].id]
      return {
          ...profile,
          match: matchList // Update the match value here
      };
    }
    return profile;
   });
   console.log(userP);
  }

  const handleDislike = () => {
    addDisLikeList();
    Animated.spring(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };
  /**
   * Update the match value for the user object if the user swipes left or click x icon
   */
  const addDisLikeList = () => {
    console.log('add dislike');
    // Find the object with the specific id and update its match value
    userP = userP.map(profile => {
    if (profile.id === 5) { // Assuming update the match value for the object with id 5
      const matchList = [...profile.dislike, Users[currentIndex].id]
      return {
          ...profile,
          dislike: matchList // Update the match value here
      };
    }
    return profile;
   });
   console.log(userP);
  }
  return (
    <View style={styles.container}>
       <NavBar displayProfile={() => setShowProfile(true)} />
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
