import React from "react";
import styles from "../assets/styles";

import { Text, View } from "react-native";
import Icon from "./Icon";
import { MaterialIcons } from "@expo/vector-icons";

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
      <Text style={styles.name}>{firstname}</Text>

      <Text style={styles.descriptionProfileItem}>{charactername}</Text>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="body-outline" size={20} />
        </Text>
        <Text style={styles.infoContent}>{bio}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="body-sharp" size={20} />
        </Text>
        <Text style={styles.infoContent}>{characterClass}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon
            name="trail-sign-sharp"
            color="black"
            size={20}
          />
        </Text>
        <Text style={styles.infoContent}>{campaign}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="trending-up-sharp" size={20}/>
        </Text>
        <Text style={styles.infoContent}>{characterlevel}</Text>
      </View>

      
    </View>
  );
};

export default ProfileItem;
