import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { Dimensions, View, Animated, Text } from "react-native";
import NavBar from "./NavBar.js";
import ProfileScreen from "./ProfileScreen";
import Demo from "../assets/Demo";
import UserCard from "./UserCard";
import styles from "../assets/styles";

const SCREEN_WIDTH = Dimensions.get("window").width;

let Users = Demo;

export const Home = ({ user, updateUser }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();
  const [showProfile, setShowProfile] = useState(false);
  const [currentUsers, setCurrentUsers] = useState(user);
  const [matched, setMatched] = useState(false);
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
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [matched]);
  useEffect(() => {
    updateUser(currentUsers);
  }, [currentUsers]);

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
  /**
   * Update the match value for the user object if the user swipes right
   */
  const addToLikeList = () => {
    console.log("add like");
    // console.log(filteredUsers[currentIndex]);
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

    setCurrentUsers(tempUser);
    otherU = filteredUsers[currentIndex];
    findMatch(tempUser, otherU);
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
      console.log("\n\n update current users match list", matchList);
      console.log("\n\n", updatedCurrentUser);
      setCurrentUsers(updatedCurrentUser);

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

      setUpdateOtherUser(otherUser);
      console.log("\n\n liked users match list", matchList2);
      console.log("\n\n", otherUser);
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
    const dislikeList = [...user.dislike, filteredUsers[currentIndex].id];
    let tempUser = { ...user };
    tempUser.dislike = dislikeList;
    // Find the object with the specific id and update its match value
    Users = Users.map((profile) => {
      if (
        profile.email === user.email &&
        !profile.like.includes(filteredUsers[currentIndex].id)
      ) {
        return {
          ...profile,
          dislike: dislikeList, // Update the match value here
        };
      }
      return profile;
    });
    setCurrentUsers(tempUser);
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
            ) : (
            
          <View style={[styles.cards, styles.noUsersContainer]}>
              <Text style= {styles.noUsersText}>No more users available</Text>
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
