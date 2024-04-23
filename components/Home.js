import React, { useState, useEffect } from 'react';
import { Dimensions, View, Animated,Text } from 'react-native';
import NavBar from './NavBar.js';
import ProfileScreen from './ProfileScreen';
import Demo from '../assets/Demo';
import UserCard from './UserCard';
import styles from '../assets/styles';
import {saveRemoteProfiles, getRemoteProfiles, loadList} from './RemoteHandler'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';

const SCREEN_WIDTH = Dimensions.get('window').width;

loadurl="https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=ryeland"
saveurl="https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=ryeland"

export const Home = ({user}) => {
  // const {
  //   email,
  //   password,
  //   name
  // } = user
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();
  const [showProfile, setShowProfile] = useState(true);
  const [Users, setUsers] = useState([{}]);

  //Trying to save t
  // getRemoteProfiles(loadurl,Demo);

  //Get the users from our remote
  useEffect(() => {
    getRemoteProfiles(loadurl).then((ret)=>{
      console.log('USE EFFECCT SEE NEEEEEEEEEEEEEEEEEEEEEEE');
      setUsers(ret);
      console.log(Users);
    }).catch((e) => {
      console.log("Failure during setUsers")
      console.log(e)
    })
  }, [currentIndex])

  const handleLike = () => {
    addToLikeList();
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
  const addToLikeList = () => {
    console.log('add match1');

    // Find the object with the specific id and update its match value
    Users.then((ret)=>{

      ret = ret.map(profile => {
      if (profile.email === user.email) { // Assuming update the match value for the object with id 5
        const likeList = [...profile.like, ret[currentIndex].id]
        return {
            ...profile,
            like: likeList // Update the match value here
        };
      }

      return profile;
    })
   });
   console.log(ret);
  }

  function getUsers(){
    console.log("RYELAND LOOK HERE")
    Users.then((val)=>{
      setUsers(val)
      console.log("returning below")
      console.log(val[currentIndex])
      return val[currentIndex]
    })
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
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };
  /**
   * Update the match value for the user object if the user swipes left or click x icon
   */
  const addDisLikeList = () => {
    console.log('add dislike');
    
    // Find the object with the specific id and update its match value
    Users = Users.map(profile => {
    if (profile.email === user.email) { // Assuming update the match value for the object with id 5
      
      const dislikeList = [...profile.dislike, Users[currentIndex].id]
      return {
          ...profile,
          dislike: dislikeList // Update the match value here
      };
    }
    return profile;
   });
   console.log(Users);
  }

  function ltc(){
    console.log("User condidtion!")
    console.log(Users)
   return currentIndex < Users.length
  }

  return (
    <View style={styles.container}>
       
      <View style={styles.contentContainer}>
        {showProfile && ltc && (
          <View style={styles.cards}>
            <UserCard
              user={Users[currentIndex]}
              position={position}
              onLike={handleLike}
              onDislike={handleDislike}
              toggleProfile={toggleProfile}
            />
          </View>
        )}
      </View>
    </View>
  );
}
