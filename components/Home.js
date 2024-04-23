import React, { useState, useEffect } from 'react';
import { Dimensions, View, Animated,Text } from 'react-native';
import NavBar from './NavBar.js';
import ProfileScreen from './ProfileScreen';
import Demo from '../assets/Demo';
import UserCard from './UserCard';
import styles from '../assets/styles';
import {saveRemoteProfiles, getRemoteProfiles, loadList} from './RemoteHandler'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';
import MatchedScreen from "./MatchedScreen"; // Import MatchedScreen component

const SCREEN_WIDTH = Dimensions.get("window").width;

loadurl="https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=ryeland"
saveurl="https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=ryeland"

export const Home = ({ user, updateUser }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();
  const [showProfile, setShowProfile] = useState(false);
  const [currentUsers, setCurrentUsers] = useState(user);
  const [matched, setMatched] = useState(false);
  const [matchedUserID, setMatchedUserID] = useState(null); // Track matched user ID
  const [updateU, setupdateU] = useState(user);
  const [updateOtherUser, setUpdateOtherUser] = useState(null);
  const filteredUsers = Users.filter(
    (u) =>
      u.email !== user.email &&
      !user.like.includes(u.id) &&
      !user.match.includes(u.id)
  );

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

  useEffect(() => {
    if (matched) {
      const timer = setTimeout(() => {
        setMatched(false); // Reset matched state after 3 seconds
      }, 5000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [matched]);

  useEffect(() => {
    updateUser(updateU);
    setCurrentUsers(updateU);
  }, [updateU]);

  useEffect(() => {}, [currentUsers]);

  useEffect(() => {
    if (matched) {
      // If matched, show MatchedScreen
      setShowProfile(false); // Hide ProfileScreen if it's open
    }
  }, [matched]);

  const handleLike = () => {
    addToLikeList();
    Animated.spring(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(currentIndex);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const addToLikeList = () => {
    console.log("add like");
    const likeList = [...user.like, filteredUsers[currentIndex].id];
    let tempUser = { ...user };
    tempUser.like = likeList;
    Users = Users.map((profile) => {
      if (
        profile.email === user.email &&
        !profile.like.includes(filteredUsers[currentIndex].id)
      ) {
        return {
          ...profile,
          like: likeList,
        };
      }
      return profile;
    });

    // setupdateU(tempUser);
    otherU = filteredUsers[currentIndex];
    findMatch(tempUser, otherU);
  };

  const findMatch = (currentUser, otherUser) => {
    let updatedCurrentUser = currentUser;
    if (
      otherUser.like.includes(currentUser.id) &&
      !otherUser.match.includes(currentUser.id) &&
      !currentUser.match.includes(otherUser.id)
    ) {
      console.log("add match");
      const matchList = [...currentUser.match, otherUser.id];
      updatedCurrentUser = { ...currentUser, match: matchList };
      //update match for currentUser
      Users = Users.map((profile) => {
        if (profile.email === updatedCurrentUser.email) {
          return {
            ...profile,
            match: matchList,
          };
        }
        return profile;
      });

      const matchList2 = [...otherUser.match, currentUser.id];
      otherUser.match = matchList2;
      Users = Users.map((profile) => {
        if (profile.email === otherUser.email) {
          return {
            ...profile,
            match: matchList2,
          };
        }
        return profile;
      });

      setUpdateOtherUser(otherUser);
      console.log("\n\n liked users match list", matchList2);
      console.log("\n\n", otherUser);
            // Set matchedUserID for MatchedScreen
            setMatchedUserID(otherUser.id);

            // Set matched to true to trigger MatchedScreen display
            setMatched(true);
    }
    console.log("\n\n update current users match list");
    console.log("\n\n", updatedCurrentUser);
    setupdateU(updatedCurrentUser);
  };

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
    if (!showProfile) {
      setCurrentUsers(filteredUsers[currentIndex]);
    }
  };

  const addDisLikeList = () => {
    console.log("add dislike");
    const dislikeList = [...user.dislike, filteredUsers[currentIndex].id];
    let tempUser = { ...user };
    tempUser.dislike = dislikeList;
    Users = Users.map((profile) => {
      if (
        profile.email === user.email &&
        !profile.like.includes(filteredUsers[currentIndex].id)
      ) {
        return {
          ...profile,
          dislike: dislikeList,
        };
      }
      return profile;
    });
    setupdateU(tempUser);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {!showProfile && currentIndex < filteredUsers.length ? (
          <View style={styles.cards}>
            <UserCard
              user={filteredUsers[currentIndex]}
              position={position}
              onLike={handleLike}
              onDislike={handleDislike}
              toggleProfile={toggleProfile}
            />
          </View>
        ) : null}
        {showProfile && (
          <ProfileScreen
            user={currentUsers}
            onClose={toggleProfile}
            edit={false}
          />
        )}
        {!showProfile && currentIndex >= filteredUsers.length && (
          <View style={[styles.cards, styles.noUsersContainer]}>
            <Text style={styles.noUsersText}>No more users available</Text>
          </View>
        )}
      </View>
      {matched && (
        <View style={[styles.overlay, styles.matchedContainer]}>
          <MatchedScreen user={user} matchedUserID={matchedUserID} />
        </View>
      )}
    </View>
  );
};

export default Home;
