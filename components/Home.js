import React, { useState } from "react";
import { Dimensions, View, Animated, Text } from "react-native";
import NavBar from "./NavBar.js";
import ProfileScreen from "./ProfileScreen";
import Demo from "../assets/Demo";
import UserCard from "./UserCard";
import styles from "../assets/styles";

const SCREEN_WIDTH = Dimensions.get("window").width;

let Users = Demo;

export const Home = ({ user }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();
  const [showProfile, setShowProfile] = useState(false);
  const [currentUsers, setCurrentUsers] = useState(user);
  const [updateOtherUser, setUpdateOtherUser] = useState(null);
  const filteredUsers = Users.filter(
    (u) =>
      u.email !== user.email &&
      !user.like.includes(u.id) &&
      !user.match.includes(u.id)
  );

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
    console.log("add like");
    console.log(filteredUsers[currentIndex]);
    const likeList = [...user.like, filteredUsers[currentIndex].id];
    let tempUser = { ...user };
    tempUser.like = likeList;
    // Find the object with the specific id and update its match value
    Users = Users.map((profile) => {
      if (
        profile.email === user.email &&
        !profile.like.includes(filteredUsers[currentIndex].id)
      ) {
        return {
          ...profile,
          like: likeList, // Update the match value here
        };
      }

      return profile;
    });

    let otherU = filteredUsers[currentIndex];
    findMatch(tempUser, otherU);
  };
  const findMatch = (currentUser, otherUser) => {
    console.log("add match");
    if (
      otherUser.like.includes(currentUser.id) &&
      !otherUser.match.includes(currentUser.id) &&
      !currentUser.match.includes(otherUser.id)
    ) {
      const matchList = [...currentUser.match, otherUser.id];
      currentUser.match = matchList;
      //update match for currentUser
      Users = Users.map((profile) => {
        if (profile.email === currentUser.email) {
          return {
            ...profile,
            match: matchList, // Update the match value here
          };
        }

        return profile;
      });
      console.log("\n\n liked users match list", matchList);
      console.log("\n\n", currentUser);
      setCurrentUsers(currentUser);
      //update match for otherUser
      const matchList2 = [...otherUser.match, currentUser.id];
      otherUser.match = matchList2;
      Users = Users.map((profile) => {
        if (profile.email === otherUser.email) {
          return {
            ...profile,
            match: matchList2, // Update the match value here
          };
        }
        return profile;
      });
      console.log("\n\n liked users match list", matchList2);
      console.log("\n\n", otherUser);
      setUpdateOtherUser(otherUser);
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

  /**
   * Update the match value for the user object if the user swipes left or click x icon
   */
  const addDisLikeList = () => {
    console.log("add dislike");

    // Find the object with the specific id and update its match value
    Users = Users.map((profile) => {
      if (
        profile.email === user.email &&
        !profile.like.includes(filteredUsers[currentIndex].id)
      ) {
        // Assuming update the match value for the object with id 5

        const dislikeList = [
          ...profile.dislike,
          filteredUsers[currentIndex].id,
        ];
        return {
          ...profile,
          dislike: dislikeList, // Update the match value here
        };
      }
      return profile;
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {!showProfile && currentIndex < filteredUsers.length && (
          <View style={styles.cards}>
            <UserCard
              user={filteredUsers[currentIndex]}
              position={position}
              onLike={handleLike}
              onDislike={handleDislike}
              toggleProfile={toggleProfile}
            />
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
    </View>
  );
};
