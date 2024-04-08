import React from 'react';
import styles from '../assets/styles';

import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import ProfileItem from './ProfileItem';
import Icon from './Icon';
import Demo from '../assets/Demo';

const Profile = ({onClose, user, edit, back}) => {
  const {
    age,
    uri,
    info1,
    info2,
    info3,
    info4,
    location,
    match,
    name
  } = user
	

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={uri} style={styles.photo}>
          <View style={styles.top}>
          {back === false ? null : ( 
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.topIconLeft}>
                <Icon name="chevron-back-sharp" size= {20}  />
              </Text>
            </TouchableOpacity>
            )}
          </View>
        </ImageBackground>

        <ProfileItem
          matches={match}
          name={name}
          age={age}
          location={location}
          info1={info1}
          info2={info2}
          info3={info3}
          info4={info4}
        />

        <View style={styles.actionsProfile}>

          {edit === false ? null : ( 
          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.iconButton}>
              <Icon name="create-outline"/>
            </Text>
            <Text style={styles.textButton}>Edit Profile</Text>
          </TouchableOpacity>
          )}

        </View>
      </ScrollView>
    </ImageBackground>
    
  );
};

export default Profile;
