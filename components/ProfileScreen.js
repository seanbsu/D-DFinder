import React from "react";
import styles from "../assets/styles";

import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import ProfileItem from "./ProfileItem";
import Icon from "./Icon";
import Demo from "../assets/Demo";

const Profile = ({ onClose, user, edit, back }) => {
  // console.log("user");
  // console.log(user);

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      style={styles.bg}>
      <ScrollView style={styles.containerProfile}>
        <ImageBackground
          source={(user.uri === "")? require("../assets/icon.jpg"): user.uri} //need a default uri
          style={styles.photo}>
          <View style={styles.top}>
            {back === false ? null : (
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.topIconLeft}>
                  <Icon
                    name="chevron-back-sharp"
                    size={20}
                  />
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity>
              <Text style={styles.topIconRight}>
                <Icon
                  name="ellipsis-vertical"
                  size={20}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ProfileItem
          firstname={user.firstname}
          charactername={user.charactername}
          characterClass={user.characterClass}
          characterlevel={user.characterLevel}
          campaign={user.campaign}
          bio={user.bio}
        />

        <View style={styles.actionsProfile}>
          {edit === false ? null : (
            <TouchableOpacity style={styles.circledButton}>
              <Text style={styles.iconButton}>
                <Icon name="ellipsis-horizontal" />
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.iconButton}>
              <Icon name="chatbubble" />
            </Text>
            <Text style={styles.textButton}>Start chatting</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
