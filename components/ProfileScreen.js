import React, { useState } from 'react';
import { ScrollView, View, Text, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import ProfileItem from './ProfileItem';
import Icon from './Icon';
import EditProfileScreen from './EditProfileScreen';
import styles from '../assets/styles';

const Profile = ({ onClose, user, edit, back }) => {
  const { age, uri, info1, info2, info3, info4, location, match, name } = user;
  const [editing, setEditing] = useState(false);

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleCloseEdit = () => {
    setEditing(false);
  };

  return (
    <ImageBackground source={require('../assets/bg.png')} style={styles.bg}>
      <ScrollView style={styles.containerProfile}>
        <ImageBackground
          source={(user.uri === "")? require("../assets/icon.jpg"): user.uri} //need a default uri
          style={styles.photo}>
          <View style={styles.top}>
            {back === false ? null : (
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.topIconLeft}>
                  <Icon name="chevron-back-sharp" size={20} />
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

        {edit !== false && ( // Ensure the "Edit Profile" button is rendered when 'edit' prop is not explicitly set to false
          <View style={styles.actionsProfile}>
            <TouchableOpacity style={styles.roundedButton} onPress={handleEditProfile}>
              <Text style={styles.iconButton}>
                <Icon name="create-outline" />
              </Text>
              <Text style={styles.textButton}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Modal visible={editing} animationType="slide">
        <EditProfileScreen setShowEditProfile={handleCloseEdit} user={user} edit />
      </Modal>
    </ImageBackground>
  );
};

export default Profile;
