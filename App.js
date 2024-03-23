import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Image, Animated, PanResponder, Text } from 'react-native';
import InteractionBar from './components/InteractionBar.js';
import NavBar from './components/NavBar.js';
import ProfileScreen from './components/ProfileScreen';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Users = [
  { id: "1", uri: require('./assets/1.jpg') },
  { id: "2", uri: require('./assets/2.jpg') },
  { id: "3", uri: require('./assets/3.jpg') },
  { id: "4", uri: require('./assets/4.jpg') },
  { id: "5", uri: require('./assets/5.jpg') },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();
  const [showProfile, setShowProfile] = useState(false);

  const displayProfile = () => {
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

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
      {!showProfile && <NavBar displayProfile={displayProfile} />}
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
        {showProfile && <ProfileScreen closeProfile={closeProfile} />}
        <View style={styles.footer} />
      </View>
    </View>
  );
}

function UserCard({ user, position, onLike, onDislike }) {
  const [showButtons, setShowButtons] = useState(false);

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
      <Image style={styles.image} source={user.uri} />
      
    </Animated.View>
    <InteractionBar onLike={onLike} onDislike={onDislike}/>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    flex: 1, // Make the content container flex to take remaining space
  },
  cards: {
    flex: 1
  },
  footer: {
    height: 60,
    backgroundColor: 'grey',
  },
  card: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH,
    padding: 10,
    position: 'absolute'
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20
  },
  like: {
    position: 'absolute',
    top: 70,
    left: 50,
    zIndex: 1000
  },
  dislike: {
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1000
  },
  buttonTextLike: {
    borderWidth: 1,
    padding: 10,
    fontWeight: '800',
    color:'#00FF00', 
    borderColor:'#00FF00', 
  },
  buttonTextDislike: {
  borderWidth: 1,
  padding: 10,
  fontWeight: '800',
  color:'#FF0000',
  borderColor:'#FF0000',
  },
});