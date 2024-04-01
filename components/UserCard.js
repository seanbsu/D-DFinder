import React, { useState, useMemo } from 'react';
import { Animated, PanResponder, Text, Image, Dimensions } from 'react-native';
import InteractionBar from './InteractionBar'; // Import InteractionBar component
import styles from '../assets/styles/index';
import ProfileScreen from './ProfileScreen';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const UserCard = ({ user, position, onLike, onDislike, toggleProfile }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-30deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });

  const rotateAndTranslate = {
    transform: [
      { rotate: rotate },
      { translateX: position.x },
      { translateY: position.y }
    ]
  };

  const likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  });

  const dislikeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp'
  });

  const panResponder = React.useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      setShowButtons(true); // Show buttons when user starts swiping
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (_, gestureState) => {
      setShowButtons(false); // Hide buttons when user stops swiping
      if (gestureState.dx > 120) {
        Animated.spring(position, {
          toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
          useNativeDriver: true,
        }).start(onLike);
      } else if (gestureState.dx < -120) {
        Animated.spring(position, {
          toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
          useNativeDriver: true,
        }).start(onDislike);
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: true,
        }).start();
      }
    }
  }), [position, onLike, onDislike]);



  return (
    <>
      
        <Animated.View
          {...panResponder.panHandlers}
          style={[rotateAndTranslate, styles.card]}
        >
          {showButtons && (
            <>
              <Animated.View style={[styles.like, { opacity: likeOpacity }]}>
                <Text style={styles.buttonTextLike}>LIKE</Text>
              </Animated.View>
              <Animated.View style={[styles.dislike, { opacity: dislikeOpacity }]}>
                <Text style={styles.buttonTextDislike}>NOPE</Text>
              </Animated.View>
            </>
          )}
          <Image style={styles.image} source={user.uri}></Image>
          
        </Animated.View>
      
      
      {showProfile && <ProfileScreen  />} 
      
      {!showProfile && <InteractionBar onLike={onLike} onDislike={onDislike} name={user.name} user={user} toggleProfile={toggleProfile} />} 
    </>
  );
}

export default UserCard;
