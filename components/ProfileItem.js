import React from "react";
import { Text, View } from "react-native";
import Icon from "./Icon";
import styles from "../assets/styles";

const ProfileItem = ({
  firstname,
  charactername,
  characterClass,
  characterlevel,
  campaign,
  bio,
}) => {
  return (
    <View style={styles.containerProfileItem}>
      <Text style={styles.name}>{charactername}</Text>

      <Text style={styles.descriptionProfileItem}>{firstname}</Text>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="body-outline" size={20} />
        </Text>
        <View style={styles.infoContentContainer}>
          <Text style={styles.infoContent}>{bio}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="body-sharp" size={20} />
        </Text>
        <View style={styles.infoContentContainer}>
          <Text style={styles.infoContent}>{characterClass}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon
            name="trail-sign-sharp"
            color="black"
            size={20}
          />
        </Text>
        <View style={styles.infoContentContainer}>
          <Text style={styles.infoContent}>{campaign}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="trending-up-sharp" size={20}/>
        </Text>
        <View style={styles.infoContentContainer}>
          <Text style={styles.infoContent}>{characterlevel}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileItem;
