import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import InteractionBar from './components/InteractionBar.js';
import NavBar from './components/NavBar.js';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Users = [
  { id: "1", uri: require('./assets/1.jpg') },
  { id: "2", uri: require('./assets/2.jpg') },
  { id: "3", uri: require('./assets/3.jpg') },
  { id: "4", uri: require('./assets/4.jpg') },
  { id: "5", uri: require('./assets/5.jpg') },
];

export default class App extends React.Component {
  constructor() {
    super();

    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0
    };

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-30deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    });

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    };

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    });
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    });
  }

  UNSAFE_componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
  }

  renderUsers = () => {
    return Users.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null;
      } else if (i == this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id}
            style={[this.rotateAndTranslate, styles.card]}>
            <Animated.View style={[styles.like, { opacity: this.likeOpacity }]}>
              <Text style={styles.buttonText}>LIKE</Text>
            </Animated.View>
            <Animated.View style={[styles.dislike, { opacity: this.dislikeOpacity }]}>
              <Text style={styles.buttonText}>NOPE</Text>
            </Animated.View>
            <Image style={styles.image} source={item.uri} />
             <Animated.View>
              <InteractionBar 
               onLike={this.handleLike} 
               onDislike={this.handleDislike}/>
               
            </Animated.View>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View key={item.id} style={[styles.card, { opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }] }]}>
            <Image style={styles.image} source={item.uri} />
          </Animated.View>
        );
      }
    }).reverse();
  };

  handleLike = () => {
    Animated.spring(this.position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      useNativeDriver: true,
    }).start(() => {
      this.setState(
        (prevState) => ({ currentIndex: prevState.currentIndex + 1 }),
        () => {
          this.position.setValue({ x: 0, y: 0 });
        }
      );
    });
  };

  handleDislike = () => {
    Animated.spring(this.position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      useNativeDriver: true,
    }).start(() => {
      this.setState(
        (prevState) => ({ currentIndex: prevState.currentIndex + 1 }),
        () => {
          this.position.setValue({ x: 0, y: 0 });
        }
      );
    });
  };

  render() {
    return (
     <View style={styles.container}>
        
        <NavBar />

        <View style={styles.contentContainer}>
          <View style={styles.cards}>{this.renderUsers()}</View>
          <View style={styles.footer} />
        </View>
      </View>
    );
  }
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
    height: 60
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
    top: 50,
    left: 40,
    zIndex: 1000
  },
  dislike: {
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1000
  },
  buttonText: {
    borderWidth: 1,
    padding: 10,
    fontWeight: '800'
  }
});