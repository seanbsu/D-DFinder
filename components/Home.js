import React, { useState, useEffect } from "react";
import { Dimensions, View, Animated, Text } from "react-native";
import NavBar from "./NavBar.js";
import ProfileScreen from "./ProfileScreen";
import Demo from "../assets/Demo";
import UserCard from "./UserCard";
import styles from "../assets/styles";
import MatchedScreen from "./MatchedScreen"; // Import MatchedScreen component

const SCREEN_WIDTH = Dimensions.get("window").width;

let Users = Demo;

export const Home = ({ user, updateUser }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();
  const [showProfile, setShowProfile] = useState(false);
  const [currentUsers, setCurrentUsers] = useState(user);
  const [matched, setMatched] = useState(false);
  const [matchedUserID, setMatchedUserID] = useState(null); // Track matched user ID
  const [updateOtherUser, setUpdateOtherUser] = useState(null);
  const filteredUsers = Users.filter(
    (u) =>
      u.email !== user.email &&
      !user.like.includes(u.id) &&
      !user.match.includes(u.id)
  );

  useEffect(() => {
    if (matched) {
      const timer = setTimeout(() => {
        setMatched(false); // Reset matched state after 3 seconds
      }, 5000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [matched]);

  useEffect(() => {
    updateUser(currentUsers);
  }, [currentUsers]);

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

    setCurrentUsers(tempUser);
    const otherUser = filteredUsers[currentIndex];
    findMatch(tempUser, otherUser);
  };

  const findMatch = (currentUser, otherUser) => {
    if (
      otherUser.like.includes(currentUser.id) &&
      !otherUser.match.includes(currentUser.id) &&
      !currentUser.match.includes(otherUser.id)
    ) {
      console.log("add match");
      const matchList = [...currentUser.match, otherUser.id];
      const updatedCurrentUser = { ...currentUser, match: matchList };
      Users = Users.map((profile) => {
        if (profile.email === currentUser.email) {
          return {
            ...profile,
            match: matchList,
          };
        }
        return profile;
      });

      setCurrentUsers(updatedCurrentUser);

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

      // Set matchedUserID for MatchedScreen
      setMatchedUserID(otherUser.id);

      // Set matched to true to trigger MatchedScreen display
      setMatched(true);
    }
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
    setCurrentUsers(tempUser);
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
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
        ) : (
          <View style={[styles.cards, styles.noUsersContainer]}>
            <Text style={styles.noUsersText}>No more users available</Text>
          </View>
        )}
        {showProfile && (
          <ProfileScreen
            user={currentUsers}
            onClose={toggleProfile}
            edit={false}
          />
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
